import { Router } from "express";
import * as workout from "../controllers/workout-controller";

const workoutRoutes = Router()

workoutRoutes.post("/workout/register", workout.register)
workoutRoutes.patch("/workout/:id/update/status", workout.updateStatus)
workoutRoutes.patch("/workout/:id/update/date", workout.updateDate)
workoutRoutes.delete("/workout/:id/delete", workout.remove)

export default workoutRoutes;