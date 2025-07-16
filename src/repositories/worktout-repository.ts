import { Prisma, Workout } from "@prisma/client";

export interface WorkoutRepository{
    create(data: Prisma.WorkoutCreateInput): Promise<Workout>;
    delete(id: string): Promise<any>;
    getWorkoutById(id: string): Promise<Workout | null>
    getCompletedWorkouts(isCompleted: boolean): Promise<Workout[]>
    getNoCompletedWorkouts(isCompleted: boolean): Promise<Workout[]>
}