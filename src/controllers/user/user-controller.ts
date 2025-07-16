import { Request, Response } from "express";
import { PrismaUserRository } from "../../repositories/prisma/prisma-user-repository";

const userRepository = new PrismaUserRository

export class UserController{
    async showUsers(req: Request, res: Response) {
        const users = await userRepository.getAll()
        
        res.send(users)
    }
    async deleteUsers(req: Request, res: Response) {
        await userRepository.deleteAll()

        res.send("users deleted")
    }
}