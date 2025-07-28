import { Router } from 'express'
import { register } from '../controllers/AuthController'

const userRoutes = Router()

userRoutes.post('/auth/register', register)

export default userRoutes;