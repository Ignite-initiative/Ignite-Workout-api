import { Prisma, Exercise } from "@prisma/client";
import { ExerciseRepository } from "../exercise-repository";
import prisma from "../../utils/prismaClient";

export class PrimaExerciseRepository implements ExerciseRepository {

    async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
        const exercise = await prisma.exercise.create({
            data,
        })

        return exercise
    }
    async delete(id: string): Promise<any> {
        return await prisma.exercise.delete({
            where: {
                id,
            }
        })
    }
}