import { Router } from "express";
import * as workout from "../controllers/workout-controller";

const workoutRoutes = Router()

workoutRoutes.post("/workout/register", workout.register)
workoutRoutes.patch("/workout/:id/status", workout.complete)

export default workoutRoutes;