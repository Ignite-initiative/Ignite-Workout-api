import { Router } from 'express'
import { UserController } from '../controllers/user/user-controller'
import { register } from '../controllers/user/register'
import { login } from '../controllers/user/login'


const userController = new UserController

const userRoutes = Router()

userRoutes.get('/users', userController.showUsers)
userRoutes.delete('/users', userController.deleteUsers)

userRoutes.post('/login', login)
userRoutes.post('/register', register)

export default userRoutes;