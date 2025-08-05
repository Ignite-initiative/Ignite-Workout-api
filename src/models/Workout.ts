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
    async register({ name, date, isCompleted, userId }: RegisterWorkoutData){
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
        if(status) {
            await prisma.workout.update({
                where: {id: id},
                data: {isCompleted: false}
            })
        }
        else{
            await prisma.workout.update({
                where: {id: id},
                data: {isCompleted: true}
            })
        }
    }
}