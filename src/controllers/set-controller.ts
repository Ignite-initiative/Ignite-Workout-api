import { Request, Response } from "express";
import { SetsModel } from "../models/Sets";

const setModel = new SetsModel

export default async function create(req: Request, res: Response) {
    const { id } = req.params
    const  { data } = req.body

    try {
        await setModel.create(data)

        res.status(201).send("Set created")
    }
    catch(error) {
        res.status(401).send({ message: error })
    }
}