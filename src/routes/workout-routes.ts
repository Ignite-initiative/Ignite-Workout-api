import { Router } from "express";
import * as workout from "../controllers/workout-controller";
import authenticateToken from "../middlewares/authenticateToken";

const workoutRoutes = Router()

workoutRoutes.post("/workout/register", authenticateToken, workout.register)
workoutRoutes.delete("/workout/:id", authenticateToken, workout.remove)

export default workoutRoutes;