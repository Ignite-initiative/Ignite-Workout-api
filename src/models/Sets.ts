import { Set } from "@prisma/client";
import prisma from "../utils/prismaClient";

interface createSetData {
    category: string,
    repsPlanned: number,
    weightPlanned: number,
    repsCompleted?: number,
    weightUsed?: number,
    dateCompleted?: Date,
    rir?: number,
    exerciseId: string
}

interface updateSetData {
    category?: string,
    repsPlanned?: number,
    weightPlanned?: number,
    repsCompleted?: number,
    weightUsed?: number,
    dateCompleted?: Date,
    rir?: number
}

export class SetsModel {
    async create(data: createSetData): Promise<Set | null> {
        const { category, repsPlanned, weightPlanned, exerciseId } = data

        return await prisma.set.create({
            data: {
                category,
                repsPlanned,
                weightPlanned,
                exerciseId
            }
        })
    }
    async update(data: updateSetData, id: string): Promise<Set | null> {
        return await prisma.set.update({
            where: { id, },
            data
        })
    }
    async delete(id: string): Promise<Set | null> {
        return await prisma.set.delete({ where: { id } })
    }
}