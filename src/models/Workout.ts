import prisma from "../utils/prismaClient";
import { Workout, Prisma } from "@prisma/client";
import { workoutNotFound } from "../errors/workout/workout-errors";

interface RegisterWorkoutData{
    name: string,
    date: Date,
    isCompleted: boolean,
    userId: string; 
}

export class WorkoutModel{
    static async create(data: Prisma.WorkoutCreateInput): Promise<Workout> {
        return await prisma.workout.create({ data })
    }
    static async findUnique(id: string,  ): Promise<Workout | null>{
        return prisma.workout.findUnique( { where: { id } } ) 
    }
    static async count(where?: Prisma.WorkoutWhereInput): Promise<number>{
        return await prisma.workout.count({ where })
    }
    
    async register({
        name, 
        date, 
        isCompleted, 
        userId 
    }: RegisterWorkoutData): Promise<Workout>{
        return await WorkoutModel.create({
            name,
            date,
            isCompleted,
            user: { connect: {id: userId}}
        })
    }    

        async delete(id: string) {
            await prisma.workout.delete({
                where: {id: id},
            })
        }
    }