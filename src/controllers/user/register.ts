import { Request, Response } from "express";
import { RegisterService } from "../../services/user/register";
import { PrismaUserRository } from "../../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExists } from "../../services/errors/email-already-exists";
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

    const {name, email, password, telephone, weight, height} = userData.parse(req.body)

    try {
        const userRepository = new PrismaUserRository
        const registerService = new RegisterService(userRepository)
    
        await registerService.execute({name, email, password, telephone, height, weight})
        
        res.status(201).send('user created')
    }
    catch(err) {
        if(err instanceof EmailAlreadyExists) {
            res.status(401).send(err.message)
        }
    }
}