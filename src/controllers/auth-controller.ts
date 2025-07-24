import { Request, Response } from "express";
import { LoginService } from "../services/user/login";
import { RegisterService } from "../services/user/register";
import { EmailAlreadyExists } from "../services/errors/email-already-exists";
import { InvalidatedCredentials } from "../services/errors/invalidated-credentials";
import { UserRepository } from "../repositories/user-repository";
import { z } from "zod";

export class AuthController{
    private loginService: LoginService
    private registerService: RegisterService
    
    constructor(private repository: UserRepository) {
    this.loginService = new LoginService(repository)
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

    login = async (req: Request, res: Response) => {
        const loginData = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })
        const {email, password} = loginData.parse(req.body)

        try {
            const token = await this.loginService.execute({email, password})

            res.json({token})
        }
        catch(err) {
            if(err instanceof InvalidatedCredentials) {
                res.status(401).send(err.message)
            }
        }
    }
}