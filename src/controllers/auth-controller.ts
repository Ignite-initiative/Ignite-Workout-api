import { Request, Response } from "express";
import { RegisterService } from "../services/auth/register";
import { EmailAlreadyExists } from "../services/errors/email-already-exists";
import { InvalidatedCredentials } from "../services/errors/invalidated-credentials";
import { UserRepository } from "../repositories/user-repository";
import { z } from "zod";

export class AuthController{
    private registerService: RegisterService
    
    constructor(private repository: UserRepository) {
    this.registerService = new RegisterService(repository)
    }

    register = async (req: Request, res: Response) => {
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
            if (!userDataParsed.success) return res.status(400).json(userDataParsed.error)
            await this.registerService.execute(userDataParsed.data)

            res.status(201).json({ message: 'user created' })
        }
        catch (err) {
            if (err instanceof EmailAlreadyExists) {
                res.status(401).send({ message: err.message })
            }
        }
    }
}