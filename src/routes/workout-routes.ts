import { Router } from "express";
import * as workout from "../controllers/workout-controller";

const workoutRoutes = Router()

workoutRoutes.post("/workout/register", workout.register)
workoutRoutes.patch("/workout/complete", workout.complete)

export default workoutRoutes;