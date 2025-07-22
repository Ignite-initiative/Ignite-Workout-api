import { Request, Response } from "express";
import { RegisterService } from "../services/user/register";
import { PrismaUserRository } from "../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExists } from "../services/errors/email-already-exists";
import { LoginService } from "../services/user/login";
import { InvalidatedCredentials } from "../services/errors/invalidated-credentials";
import { z } from "zod";

export class AuthController{
    private userPrismaRository: PrismaUserRository
    private loginService: LoginService
    private registerService: RegisterService
    
    constructor() {
    this.userPrismaRository = new PrismaUserRository()
    this.loginService = new LoginService(this.userPrismaRository)
    this.registerService = new RegisterService(this.userPrismaRository)

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
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