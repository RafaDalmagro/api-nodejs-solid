import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerService({
    name,
    email,
    password,
}: RegisterServiceRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userWithSameEmail) {
        throw new Error("Email já está em uso.");
    }

    const passwordHash = await hash(password, 6);

    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });
}
