import prisma from "../../../../src/utils/prismaClient";
import jwt from 'jsonwebtoken'

describe("PATCH on /exercise", () => {
    let exerciseId: string
    let workoutId: string
    let token: string

    beforeAll(async () => {
        await prisma.exercise.deleteMany()
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

        const exercise = await prisma.exercise.create({
            data: {
                name: "bench press",
                category: "chest",
                workoutId: workout.id
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
        exerciseId = exercise.id

    })
    afterAll(async () => {
        await prisma.exercise.deleteMany()
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })

    type updateExercisePayload = {
        name?: string,
        category?: string
    }

    async function updateExercise(updateData: updateExercisePayload, id:string) {
        const result = await fetch(`http://localhost:3000/api/v1/exercise/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        })

        return result
    }

    test("Should be return 200 if field name is updated", async () => {
        const result = await updateExercise( { name: "Inclined bench press" } ,exerciseId)

        expect(result.status).toBe(201)
    })
    test("Should be return 200 if field category is updated", async () => {
    const result = await updateExercise( { category: "back" } ,exerciseId)

    expect(result.status).toBe(201)
    })

    test("should be return 401 if user does not have access", async () => {
        const result = await fetch(`http://localhost:3000/api/v1/exercise/${exerciseId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token_invalido"
        },
        body: JSON.stringify({isCompleted: true})
    })
        expect(result.status).toBe(401)
    })
})