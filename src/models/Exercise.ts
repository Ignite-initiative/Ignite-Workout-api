import { Exercise } from "@prisma/client";
import prisma from "../utils/prismaClient";

interface CreateExerciseData {
    name: string,
    category: string,
    workoutId: string
}

interface UpdateExerciseData {
    name: string,
    category: string
}

export class ExerciseModel {
    async create(data: CreateExerciseData): Promise<Exercise | null>{
        const { name, category, workoutId } = data
        
        return await prisma.exercise.create({ data: {name, category, workoutId }})
    }

    async update(data: UpdateExerciseData, id: string): Promise<Exercise | null>{
        return await prisma.exercise.update({
            where: { id: id },
            data: data
        })
    }

    async delete(id: string): Promise<Exercise | null> {
        return await prisma.exercise.delete({ where: { id } })
    }
}