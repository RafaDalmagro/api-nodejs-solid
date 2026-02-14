import { Prisma } from "../../prisma/generated/prisma/browser";
import type { User } from "../../prisma/generated/prisma/browser";

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>;

    create(data: Prisma.UserCreateInput): Promise<User>;
}
