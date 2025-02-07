import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import mysql from "@fastify/mysql";
import fastifyStatic from "@fastify/static";
import path from "path";
import taskRoutes from "./routes/tasks";

dotenv.config({ path: "dotenv.env" });

const server = Fastify({ logger: true });

server.register(cors, {
  origin: "http://localhost:3000",
});

server.register(mysql, {
  promise: true,
  connectionString: process.env.DATABASE_URL,
});

server.register(taskRoutes);

server.register(fastifyStatic, {
  root: path.join(__dirname, "../../todo-frontend/dist"),
});

server.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html"); // place holder if any err occurs
});

server.setErrorHandler((error, request, reply) => {
  reply.code(500).send({
    error: "An unexpected error occurred",
    details: error.message,
  });
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Server running on localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
