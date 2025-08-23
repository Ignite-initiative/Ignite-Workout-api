import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
    user?: string | JwtPayload
}

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : req.headers.token as string;
    
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
        
    try {
        const authReq = req as AuthRequest;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string, name: string };
        authReq.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}