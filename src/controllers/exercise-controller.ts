import { Request, response, Response } from "express";
import { ExerciseModel } from "../models/Exercise";

const exerciseModel = new ExerciseModel

export async function create(req: Request, res: Response) {
    const data = req.body

    try {
        await exerciseModel.create(data)

        res.status(201).send("Exercise Created")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    try {
        await exerciseModel.update(data, id)

        res.status(201).send("Exercise Updated")
    }
    catch(error) {
        res.status(401).send({ message: error }
        )
    }
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params

    try {
        await exerciseModel.delete(id)

        res.status(201).send("Ecercise Deleted")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}