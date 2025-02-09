"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ Ensure .env loads first
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const mysql_1 = __importDefault(require("@fastify/mysql"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const tasks_1 = __importDefault(require("./routes/tasks"));
// Debugging: Log database connection details before initializing MySQL
console.log("🔍 Debugging Database Connection:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
const server = (0, fastify_1.default)({ logger: true });
server.register(cors_1.default, {
    origin: "*",
});
server.register(mysql_1.default, {
    promise: true,
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234", // ✅ Ensure password matches .env and docker-compose
    database: process.env.DB_NAME || "todo_app",
});
server.register(tasks_1.default);
server.register(static_1.default, {
    root: path_1.default.join(__dirname, "../../todo-frontend/dist"),
});
server.setNotFoundHandler((request, reply) => {
    reply.sendFile("index.html"); // Place holder if any error occurs
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
        console.log("🚀 Server running on http://localhost:3000");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
