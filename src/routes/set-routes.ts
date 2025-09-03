import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import * as set from "../controllers/set-controller"

const setRoutes = Router()

setRoutes.post("/set", authenticateToken, set.create)
setRoutes.patch("/set/:id", authenticateToken, set.update)
setRoutes.delete("/set/:id", authenticateToken, set.remove)

export default setRoutes;