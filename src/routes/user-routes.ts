import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'

const authController = new AuthController

const userRoutes = Router()

userRoutes.post('/login', authController.login)
userRoutes.post('/register', authController.register)

export default userRoutes;