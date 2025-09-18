import express from 'express'
import userRoutes from './routes/auth-routes'
import prisma from './utils/prismaClient'
import statusRoutes from './routes/status-routes'
import workoutRoutes from './routes/workout-routes'
import exerciseRoutes from './routes/exercise-routes'
import setRoutes from './routes/set-routes'

const app = express()

app.use(express.json())

app.use("/api/v1", userRoutes)
app.use("/api/v1", statusRoutes)
app.use("/api/v1", workoutRoutes)
app.use("/api/v1", exerciseRoutes)
app.use("/api/v1", setRoutes)

prisma.$connect()

app.listen('3000', () => {
    console.log('server is running...')
})