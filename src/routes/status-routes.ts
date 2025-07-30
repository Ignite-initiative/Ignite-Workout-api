import { Router } from "express";
import status from "../controllers/status-controller";

const statusRoutes = Router()

statusRoutes.get("/status", status)

export default statusRoutes;