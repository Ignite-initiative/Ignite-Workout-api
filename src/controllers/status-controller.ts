import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

export default async function status(req: Request, res: Response) {
    try {
        const [versionResult, maxConnResult, openedConnResult] = await Promise.all([
        prisma.$queryRawUnsafe<any>(`SHOW server_version;`),
        prisma.$queryRawUnsafe<any>(`SHOW max_connections;`),
        prisma.$queryRawUnsafe<any>(`
            SELECT COUNT(*) 
            FROM pg_stat_activity 
            WHERE state = 'active';
        `),
        ]);

        const updatedAt = new Date();

        res.status(200).json({
        status: "Ok",
        updated_at: updatedAt.toISOString(),
        dependencies: {
            database: {
            version: versionResult[0]?.server_version || "unknown",
            max_connections: Number(maxConnResult[0]?.max_connections) || "unknown",
            opened_connections: Number(openedConnResult[0]?.count) || 0,
            }
        }
        });
    } catch (error) {
        console.error("Error to check status:", error);
        res.status(500).json({
        status: "error",
        message: "Error to check application status",
        updated_at: new Date().toISOString()
        });
    }
}