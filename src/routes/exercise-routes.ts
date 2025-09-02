import { Router } from "express";
import * as exercise from "../controllers/exercise-controller"
import authenticateToken from "../middlewares/authenticateToken";

const exerciseRoutes = Router()

exerciseRoutes.post("/exercise", authenticateToken, exercise.create)
exerciseRoutes.patch("/exercise/:id", authenticateToken, exercise.update)
exerciseRoutes.delete("/exercise/:id", authenticateToken, exercise.remove)

export default exerciseRoutes;