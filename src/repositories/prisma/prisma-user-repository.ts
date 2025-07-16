import prisma from '../../utils/prismaClient'
import { Prisma } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRository implements UserRepository {
    async getAll() {
        return await prisma.user.findMany()
    }
    async deleteAll() {
        return await prisma.user.deleteMany({})
    }
    async getByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            }
        })
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}