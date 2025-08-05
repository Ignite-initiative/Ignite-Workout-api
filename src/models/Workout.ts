import prisma from "../utils/prismaClient";
import { Prisma, Workout } from "@prisma/client";
import { Request, Response } from "express";

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

    async updateStatus(id: string, status: boolean) {
        const workout = await WorkoutModel.findUnique(id)

        await prisma.workout.update({
            where: {id: id},
            data: {isCompleted: !workout?.isCompleted}
        })
    }
}