import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import * as set from "../controllers/set-controller"

const setRouter = Router()

setRouter.post("/set", authenticateToken, set.create)
setRouter.patch("/set/:id", authenticateToken, set.update)