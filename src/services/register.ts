import { hash } from "bcryptjs";
import type { UsersRepository } from "@/respositories/users-repository";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterServiceRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await hash(password, 6);

        // const prismaUsersRepository = new PrismaUsersRepository();

        await this.usersRepository.create({
            name,
            email,
            passwordHash,
        });
    }
}
