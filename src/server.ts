import express from 'express'
import userRoutes from './routes/user-routes'
import prisma from './utils/prismaClient'

const app = express()

app.use(express.json())

app.use(userRoutes)

prisma.$connect()

app.listen('3000', () => {
    console.log('server is running...')
})