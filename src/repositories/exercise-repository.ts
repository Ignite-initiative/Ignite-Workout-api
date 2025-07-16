import { Exercise, Prisma } from "@prisma/client";

export interface ExerciseRepository {
    create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
    delete(id: string): Promise<any>
}