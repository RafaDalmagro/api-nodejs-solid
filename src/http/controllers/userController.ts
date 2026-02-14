import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(2),
        email: z.email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: password,
        },
    });

    return reply.status(201).send();
}
