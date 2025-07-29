import { Router } from 'express'
import { register } from '../controllers/auth-controller'

const userRoutes = Router()

userRoutes.post('/auth/register', register)

export default userRoutes;