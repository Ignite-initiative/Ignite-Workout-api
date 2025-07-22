import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'

const authController = new AuthController

const userRoutes = Router()

userRoutes.post('/auth/login', authController.login)
userRoutes.post('/auth/register', authController.register)

export default userRoutes;