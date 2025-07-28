import { Request, Response } from "express";
import { EmailAlreadyExists } from "../errors/email-already-exists";
import { UserModel } from "../models/User";
import { z } from "zod";



export async function register(req: Request, res: Response) {
    const userData = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        telephone: z.string().nullable(),
        height: z.number(),
        weight: z.number()
    })
    
    const userDataParsed = userData.safeParse(req.body)
    
    try {
            const userModel = new UserModel

            if (!userDataParsed.success) return res.status(400).json(userDataParsed.error)
            await userModel.register(userDataParsed.data)

            res.status(201).json({ message: 'user created' })
        }
        catch (err) {
            if (err instanceof EmailAlreadyExists) {
                res.status(401).send({ message: err.message })
            }
        }
    }