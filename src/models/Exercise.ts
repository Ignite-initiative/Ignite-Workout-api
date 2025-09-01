import { Exercise } from "@prisma/client";
import prisma from "../utils/prismaClient";

interface CreateExerciseData {
    name: string,
    category: string,
    workoutId: string
}

export class ExerciseModel {
    async create(data: CreateExerciseData): Promise<Exercise | null>{
        const { name, category, workoutId } = data
        
        return await prisma.exercise.create({ data: {name, category, workoutId }})
    }
}