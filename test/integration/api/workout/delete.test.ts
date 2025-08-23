import prisma from "../../../../src/utils/prismaClient";
import jwt from 'jsonwebtoken'

describe("DELETE on /workout", () => {
    let workoutId: string
    let token: string

    beforeAll(async () => {
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()

        const user = await prisma.user.create({
            data: {
                name: "Pedro",
                email: "teste@email.com",
                password_hash: "hshsshhs",
                telephone: "61 12345-1234",
                height: 1.67,
                weight: 85
            }
        })

        const workout = await prisma.workout.create({
            data: {
                name: "treino 1",
                date: new Date("2025-11-11"),
                isCompleted: false,
                userId: user.id
            }
        })

        token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
            }, 
            process.env.JWT_SECRET_KEY || "testkey", 
            { expiresIn: '12h' }
        );

        workoutId = workout.id

    })
    afterAll(async () => {
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })


    async function deleteWorkout(id: string) {
        const result = await fetch(`http://localhost:3000/api/v1/workout/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        return result
    }

    test("Should be return 200 if workout is deleted", async () => {
        const result = await deleteWorkout(workoutId)

        expect(result.status).toBe(200)
    })
    test("should be return 401 if user does not have access", async () => {
        const result = await fetch(`http://localhost:3000/api/v1/workout/${workoutId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_invalido"
        }
    })
        expect(result.status).toBe(401)
    })
})