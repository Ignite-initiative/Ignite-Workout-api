import prisma from "../utils/prismaClient";
import { Workout } from "@prisma/client";

interface RegisterWorkoutData{
    name: string,
    date: Date,
    isCompleted: boolean,
    userId: string; 
}

export class WorkoutModel{
    static async findUnique(id: string){
        return prisma.workout.findUnique( { where: { id } } ) 
    }

    async register({ 
        name, 
        date, 
        isCompleted, 
        userId 
    }: RegisterWorkoutData): Promise<Workout>{
        return await prisma.workout.create({
            data: { 
                name,
                date,
                isCompleted,
                user: {
                    connect: { id: userId }
                }
            }
        })
    }

    async updateStatus(id: string) {
        const workout = await WorkoutModel.findUnique(id)

        await prisma.workout.update({
            where: {id: id},
            data: {isCompleted: !workout?.isCompleted}
        })
    }
    async updateDate(id: string, date: Date) {
        await prisma.workout.update({
            where: {id: id},
            data: {date: new Date(date)}
        })
    }
}