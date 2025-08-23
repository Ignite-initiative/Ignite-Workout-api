import prisma from "../../../../src/utils/prismaClient";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

describe("POST on /login", () => {

    beforeAll(async () => {
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()

        const hashedPassword = await hash("senhasecreta", 10);
        
        const user = await prisma.user.create({
            data: {
                name: "Pedro",
                email: "teste@email.com",
                password_hash: hashedPassword,
                telephone: "61 12345-1234",
                height: 1.67,
                weight: 85
            }
        })
    })

    afterAll(async () => {
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })

    const loginData = {
        email: "teste@email.com",
        password: "senhasecreta",
    }

    type LoginPayload = {
        email: string,
        password: string,
    }

    const requiredFields: (keyof LoginPayload)[] = ["email", "password"]

    async function login(loginData: Partial<LoginPayload>) {
        const result = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        return result; 
    }

    test("Should return a status 200 on success", async () => {
        const result = await login(loginData)
        expect(result.status).toBe(200)
        
        const responseBody = await result.json()
        expect(responseBody).toHaveProperty('token')
        expect(responseBody.token).toBeDefined()

        const decoded = jwt.verify(responseBody.token, process.env.JWT_SECRET_KEY!)
        expect(decoded).toHaveProperty('userId')
        expect(decoded).toHaveProperty('email', 'teste@email.com')
    })

    test.each(requiredFields)("Should return a status 400 if %s is not sent", async (field) => {
        const {[field]: ignored, ...invalidLoginData} = loginData
        const result = await login(invalidLoginData)
        expect(result.status).toBe(400)
    })
    
    test("Should return a status 401 for invalid credentials", async () => {
        const invalidCredentials = {
            email: "teste@email.com",
            password: "senhaerrada"
        }
        
        const result = await login(invalidCredentials)
        expect(result.status).toBe(401)
    })
    
    test("Should return a status 401 for non-existent email", async () => {
        const nonExistentUser = {
            email: "naoexiste@email.com",
            password: "qualquersenha"
        }
        
        const result = await login(nonExistentUser)
        expect(result.status).toBe(401)
        
    })
    
    test("Should return a valid JWT token structure", async () => {
        const result = await login(loginData)
        const responseBody = await result.json()
        
        const tokenParts = responseBody.token.split('.')
        expect(tokenParts).toHaveLength(3)
        
        expect(() => {
            jwt.verify(responseBody.token, process.env.JWT_SECRET_KEY!)
        }).not.toThrow()
    })
})