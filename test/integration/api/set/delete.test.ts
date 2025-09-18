import prisma from '../../../../src/utils/prismaClient';
import jwt from 'jsonwebtoken'
import orchestrator from '../../orchestrator';

describe("DELETE on /exercise", () => {
    let setId: string
    let token: string

    beforeAll(async () => {
        await orchestrator.waitForAllServices()
        await prisma.set.deleteMany()
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

        const set = await prisma.set.create({
          data: {
            category: "valid",
            repsPlanned: 10,
            weightPlanned: 100,
            rir: 1,
            exerciseId: exercise.id
          }
        })

        setId = set.id

        token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY || "testkey",
            { expiresIn: '12h' }
        );


    })
    afterAll(async () => {
        await prisma.set.deleteMany()
        await prisma.exercise.deleteMany()
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })


    async function deleteSet(id: string) {
        const result = await fetch(`http://localhost:3000/api/v1/set/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        return result
    }

    test("Should be return 200 if workout is deleted", async () => {
        const result = await deleteSet(setId)

        expect(result.status).toBe(201)
    })
    test("should be return 401 if user does not have access", async () => {
        const result = await fetch(`http://localhost:3000/api/v1/set/${setId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token_invalido"
            }
        })
        expect(result.status).toBe(401)
    })
})