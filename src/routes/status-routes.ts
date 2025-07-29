import { Router } from "express";
import status from "../controllers/status-controller";

const statusRoutes = Router()

statusRoutes.get("/api/v1/status", status)

export default statusRoutes;