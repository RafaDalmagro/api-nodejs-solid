import type { FastifyRequest, FastifyReply } from "fastify";

import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "@/respositories/prisma/prismaUsersRepository";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/services/errors/userAlreadyExistsError";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(2),
        email: z.email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const registerService = new RegisterService(prismaUsersRepository);

        await registerService.execute({
            name,
            email,
            password,
        });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ error: error.message });
        }

        throw error;
    }

    return reply.status(201).send();
}
