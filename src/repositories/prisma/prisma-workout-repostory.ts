import { Prisma, Workout } from "@prisma/client";
import { WorkoutRepository } from "../worktout-repository";
import prisma from "../../utils/prismaClient";

export class WorkoutPrismaRepository implements WorkoutRepository {
    async create(data: Prisma.WorkoutCreateInput) {
        const workout = await prisma.workout.create({
            data,
        })
        return workout
    }
    async delete(id: string) {
        return await prisma.workout.delete({
            where: {
                id, 
            }
        })
    }
    async getWorkoutById(id: string): Promise<Workout | null> {
        const worktout = await prisma.workout.findUnique({
            where: {
                id,
            }
        })
        return worktout
    }
    async getCompletedWorkouts(isCompleted: boolean): Promise<Workout[]> {
        const completedWorkouts = await prisma.workout.findMany({
            where: {
                isCompleted: true
            }
        })

        return completedWorkouts
    }
    async getNoCompletedWorkouts(isCompleted: boolean): Promise<Workout[]> {
        const noCompletedWorkouts = await prisma.workout.findMany({
            where: {
                isCompleted: false
            }
        })
        
        return noCompletedWorkouts
    }
}