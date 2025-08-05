import express from 'express'
import userRoutes from './routes/auth-routes'
import prisma from './utils/prismaClient'
import statusRoutes from './routes/status-routes'
import workoutRoutes from './routes/workout-routes'

const app = express()

app.use(express.json())

app.use("/api/v1", userRoutes)
app.use("/api/v1", statusRoutes)
app.use("/api/v1", workoutRoutes)

prisma.$connect()

app.listen('3000', () => {
    console.log('server is running...')
})