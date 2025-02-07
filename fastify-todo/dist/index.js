"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const mysql_1 = __importDefault(require("@fastify/mysql"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const tasks_1 = __importDefault(require("./routes/tasks"));
// 1. Load environment variables
dotenv_1.default.config({ path: "dotenv.env" });
// 2. Create Fastify instance
const server = (0, fastify_1.default)({ logger: true });
// 3. Register CORS so that requests from localhost:3000 are allowed (during dev)
server.register(cors_1.default, {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both backend & frontend origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    credentials: true, // Allow cookies if needed
});
// 4. MySQL
server.register(mysql_1.default, {
    promise: true,
    connectionString: process.env.DATABASE_URL,
});
// 5. Register your API routes
server.register(tasks_1.default);
// 6. Serve your React build folder (in production):
// Assuming your folder structure is something like:
//   backend/
//     src/
//       server.ts
//   frontend/
//     build/
// Adjust the path accordingly
server.register(static_1.default, {
    root: path_1.default.join(__dirname, "../../todo-frontend/dist"),
    // If you'd like your static files at a certain prefix, e.g. '/static', you can add:
    // prefix: '/static/',
});
// 7. If a route is not found by your backend,
//    serve index.html so React can handle routing client-side.
server.setNotFoundHandler((request, reply) => {
    reply.sendFile("index.html"); // This must exist in the build folder
});
// 8. Error Handler
server.setErrorHandler((error, request, reply) => {
    reply.code(500).send({
        error: "An unexpected error occurred",
        details: error.message,
    });
});
// 9. Start Server
const start = async () => {
    try {
        await server.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server running on localhost:3000");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
