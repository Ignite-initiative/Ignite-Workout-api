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
}