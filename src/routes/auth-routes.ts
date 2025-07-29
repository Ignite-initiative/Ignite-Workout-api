import { Router } from 'express'
import { register } from '../controllers/auth-controller'

const userRoutes = Router()

userRoutes.post('/api/v1/auth/register', register)

export default userRoutes;