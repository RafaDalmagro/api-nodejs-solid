import type { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/userController";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
}
