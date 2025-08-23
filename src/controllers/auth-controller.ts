import { Request, Response } from "express";
import { EmailAlreadyExists } from "../errors/auth/email-already-exists";
import { InvalidatedCredentials } from "../errors/auth/invalidated-credentials";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/User";
import { z } from "zod";

export async function register(req: Request, res: Response) {
    const userData = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        telephone: z.string().nullable(),
        height: z.number(),
        weight: z.number()
    })
    
    const userDataParsed = userData.safeParse(req.body)
    
    try {
            const userModel = new UserModel

            if (!userDataParsed.success) return res.status(400).json(userDataParsed.error)
            await userModel.register(userDataParsed.data)

            res.status(201).json({ message: 'user created' })
        }
        catch (err) {
            if (err instanceof EmailAlreadyExists) {
                res.status(401).send({ message: err.message })
            }
        }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        
        const userModel = new UserModel();

        const userData = await userModel.findByEmail(email);
        if (!userData) {
            return res.status(401).json({ error: InvalidatedCredentials });
        }

        const isPasswordValid = await compare(password, userData.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: InvalidatedCredentials });
        }

        const token = jwt.sign(
            { 
                userId: userData.id, 
                email: userData.email,
            }, 
            process.env.JWT_SECRET_KEY!, 
            { expiresIn: '12h' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: userData.id,
                email: userData.email,
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}