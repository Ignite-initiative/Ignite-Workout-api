import { Prisma, Set } from "@prisma/client";

export interface SetRepository {
    create(data: Prisma.SetCreateInput): Promise<Set>
    complete(data: { id: string, repsCompleted: number, weightUsed: number, rir: number, dateCompletd: Date }): Promise<Set>
    delete(id: string): Promise<any>
}