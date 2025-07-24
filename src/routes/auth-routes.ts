import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { PrismaUserRository } from '../repositories/prisma/prisma-user-repository'

const prismaUserRository = new PrismaUserRository
const authController = new AuthController(prismaUserRository)

const userRoutes = Router()

userRoutes.post('/auth/login', authController.login)
userRoutes.post('/auth/register', authController.register)

export default userRoutes;