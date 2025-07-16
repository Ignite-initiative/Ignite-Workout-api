import { Prisma, User } from "@prisma/client";

export interface UserRepository{
    getByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}