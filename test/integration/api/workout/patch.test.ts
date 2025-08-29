import prisma from "../../../../src/utils/prismaClient";
import jwt from 'jsonwebtoken'

describe("PATCH on /workout", () => {
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

    type updateWorkoutPayload = {
        date?: Date,
        isCompleted?: boolean
    }

    async function updateWorkout(updateData: updateWorkoutPayload, id:string) {
        const result = await fetch(`http://localhost:3000/api/v1/workout/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        })

        return result
    }

    test("Should be return 200 if field date is updated", async () => {
        const result = await updateWorkout( { date: new Date("2111-11-11") } ,workoutId)

        expect(result.status).toBe(200)
    })
    test("Should be return 200 if field isCompleted is updated", async () => {
    const result = await updateWorkout( { isCompleted: true } ,workoutId)

    expect(result.status).toBe(200)
    })

    test("should be return 401 if user does not have access", async () => {
        const result = await fetch(`http://localhost:3000/api/v1/workout/${workoutId}`, {
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