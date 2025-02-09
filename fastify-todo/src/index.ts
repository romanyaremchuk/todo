import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import mysql from "@fastify/mysql";
import fastifyStatic from "@fastify/static";
import path from "path";
import taskRoutes from "./routes/tasks";

// Debugging: Log database connection details before initializing MySQL
console.log("🔍 Debugging Database Connection:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const server = Fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

// 🔄 Retry MySQL connection if it fails
const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      server.register(mysql, {
        promise: true,
        host: process.env.DB_HOST || "mysql",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_NAME || "todo_app",
      });
      console.log("✅ Connected to MySQL!");
      break;
    } catch (err) {
      console.error("❌ MySQL connection failed. Retrying in 5 seconds...");
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5s before retrying
    }
  }
};

server.ready().then(async () => {
  const db = server.mysql;
  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('pending', 'completed') DEFAULT 'pending'
    )
  `);
  console.log("✅ Database schema checked: tasks table exists!");
});

server.register(taskRoutes);

server.register(fastifyStatic, {
  root: path.join(__dirname, "../../todo-frontend/dist"),
});

server.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html"); // Placeholder if any error occurs
});

server.setErrorHandler((error, request, reply) => {
  reply.code(500).send({
    error: "An unexpected error occurred",
    details: error.message,
  });
});

const start = async () => {
  try {
    await connectWithRetry(); // ✅ Ensure MySQL is connected before starting server
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
