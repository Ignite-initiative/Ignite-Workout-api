import { Request, Response } from "express";
import { WorkoutModel } from "../models/Workout";

const workoutModel = new WorkoutModel

export async function register(req: Request, res: Response){
     const workoutData = req.body;
     
     try {
          await workoutModel.register(workoutData)

          res.status(201).send({message: 'Workout Created!'})
     }
     catch(error) {
          return res.status(400).send({ message: error })
     }
}

export async function remove(req: Request, res: Response){
     const workoutId = req.params.id

     try {
          await workoutModel.delete(workoutId)

          res.status(200).send("Workout Deleted")

     }
     catch(error){
          res.status(404).send({message: error})
     }
}