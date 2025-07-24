import prisma from '../../utils/prismaClient'
import { Prisma } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRository implements UserRepository {
    async getByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            }
        })
    }

    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data,
        })

    }
}