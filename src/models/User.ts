import prisma from '../utils/prismaClient'
import { Prisma, User } from '@prisma/client'
import { EmailAlreadyExists } from "../errors/auth/email-already-exists";
import { hash } from "bcryptjs";


interface RegisterUserData {
    name: string
    email: string
    password: string
    telephone: string | null
    height: number
    weight: number
}

export class UserModel {
    static async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } })
    }

    static async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } })
    }

    static async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data })
    }

    async register({
        name,
        email,
        password,
        telephone,
        height,
        weight
    }: RegisterUserData): Promise<User> {

        const emailUsed = await UserModel.findByEmail(email)
        if (emailUsed) throw new EmailAlreadyExists()

        const password_hash = await hash(password, 10)

        const user = await UserModel.create({
            name,
            email,
            password_hash,
            telephone,
            height,
            weight
        })

        return user
    }
}