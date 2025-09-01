import { Router } from "express";
import * as exercise from "../controllers/exercise-controller"
import authenticateToken from "../middlewares/authenticateToken";

const exerciseRoutes = Router()

exerciseRoutes.post("/exercise", authenticateToken, exercise.create)

export default exerciseRoutes;