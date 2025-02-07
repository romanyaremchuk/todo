"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskRoutes = (fastify, options, done) => {
    // get all tasks
    fastify.get("/tasks", async (request, reply) => {
        try {
            const db = fastify.mysql;
            const [rows] = await db.query("SELECT * FROM tasks");
            reply.send(rows);
        }
        catch (err) {
            reply
                .code(500)
                .send({ error: "Failed to retrive all tasks", details: err });
        }
    });
    // get one task by id
    fastify.get("/tasks/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            const db = fastify.mysql;
            const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
            if (rows.length === 0) {
                reply.code(404).send({ error: "Task not found. Error 404" });
            }
            else {
                reply.send(rows[0]);
            }
        }
        catch (err) {
            reply
                .code(500)
                .send({ error: "Failed to retrieve task. Error 500", details: err });
        }
    });
    // update existing task
    fastify.put("/tasks/:id", async (request, reply) => {
        const { id } = request.params;
        const { title, description, status } = request.body;
        try {
            const db = fastify.mysql;
            const [result] = await db.query("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?", [title, description, status, id]);
            if (result.affectedRows === 0) {
                reply.code(404).send({ error: "Task not found" });
            }
            else {
                reply.send({ message: "Task updated successfully" });
            }
        }
        catch (err) {
            reply
                .code(500)
                .send({ error: "Failed to update task. Error 500", details: err });
        }
    });
    // delete task by id
    fastify.delete("/tasks/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            const db = fastify.mysql;
            const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
            if (result.affectedRows === 0) {
                reply.code(404).send({ error: "Task not found" });
            }
            else {
                reply.send({ message: "Task deleted successfully" });
            }
        }
        catch (err) {
            reply
                .code(500)
                .send({ error: "Failed to delete task. Error 500", details: err });
        }
    });
    // add task
    fastify.post("/tasks", async (request, reply) => {
        const { title, description, status } = request.body;
        try {
            const db = fastify.mysql;
            const [result] = await db.query("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)", [title, description || "", status || "pending"]);
            reply.code(201).send({
                message: "Task added successfully",
                taskId: result.insertId,
            });
        }
        catch (err) {
            reply.code(500).send({ error: "Failed to add task", details: err });
        }
    });
    done();
};
exports.default = taskRoutes;
