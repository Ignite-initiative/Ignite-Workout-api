import { Router } from 'express'
import { login, register } from '../controllers/auth-controller'

const userRoutes = Router()

userRoutes.post('/auth/register', register)
userRoutes.post('/auth/login', login)

export default userRoutes;