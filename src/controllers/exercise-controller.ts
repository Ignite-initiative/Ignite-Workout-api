import { Request, Response } from "express";
import { ExerciseModel } from "../models/Exercise";

const exerciseModel = new ExerciseModel

export default async function create(req: Request, res: Response) {
    const data = req.body

    try {
        await exerciseModel.create(data)

        res.status(200).send("Exercise Created")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}