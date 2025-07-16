import { Prisma, Set } from "@prisma/client";
import { SetRepository } from "../set-respository";
import prisma from "../../utils/prismaClient";

export class PrismaSetRepository implements SetRepository {
    
    async create(data: Prisma.SetCreateInput): Promise<Set> {
        const set = await prisma.set.create({
            data,
        })
        return set    
    }
    
    async complete(data: { id: string, repsCompleted: number; weightUsed: number; rir: number; dateCompletd: Date; }): Promise<Set> {
        const workout = await prisma.set.update({
            where: {
                id: data.id
            },
            data: {
                repsCompleted: data.repsCompleted,
                weightUsed: data.weightUsed,
                rir: data.rir,
                dateCompleted: new Date
            }
        })
        return workout
    }
    async delete(id: string): Promise<any> {
        return await prisma.set.delete({
            where: {
                id,
            }
        })
    }
}