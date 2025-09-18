import { Request, Response } from "express";
import { SetsModel } from "../models/Sets";

const setModel = new SetsModel

export async function create(req: Request, res: Response) {
    const data = req.body

    if (!data) {
        return res.status(400).json({ message: "Missing data in request body" });
    }

    try {
        await setModel.create(data)

        res.status(201).send("Set created")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const  data = req.body

    try {
        await setModel.update(data, id)

        res.status(201).send("Set updated")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params
    try {
        await setModel.delete(id)

        res.status(201).send("Set deleted")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}