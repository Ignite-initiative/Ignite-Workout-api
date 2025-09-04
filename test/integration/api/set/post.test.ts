import prisma from "../../../../src/utils/prismaClient"
import jwt from "jsonwebtoken"

describe("POST on /set", () => {
    let exerciseId: string
    let token: string

    beforeAll(async () => {
        await prisma.set.deleteMany()
        await prisma.exercise.deleteMany()
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()

        const user = await prisma.user.create({
            data: {
                name: "Pedro",
                email: "teste_exercicio@email.com",
                password_hash: "hshsshhs",
                telephone: "61 12345-1234",
                height: 1.67,
                weight: 85
            }
        })

        const workout = await prisma.workout.create({
            data: {
                name: "treino 1",
                date: new Date('2011-11-11'),
                isCompleted: false,
                userId: user.id
            }
        })

        const exercise = await prisma.exercise.create({
            data: {
                name: "exercise 1",
                category: "chest",
                workoutId: workout.id
            }
        })

        exerciseId = exercise.id

        token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY || "secretkey",
            { expiresIn: '12h' }
        );
    })

    afterEach(async () => {
        await prisma.set.deleteMany()
        await prisma.exercise.deleteMany()
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })

    type CreateSetPayload = {
        category: string,
        repsPlanned: number,
        weightPlanned: number,
        rir: number,
        exerciseId: string
    }

    async function createSet(set: CreateSetPayload) {
        const result = await fetch('http://localhost:3000/api/v1/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(set)
        })
        return result;
    }

    test("Should return a status 201 at success", async () => {
        const set = {
            category: "valid",
            repsPlanned: 10,
            weightPlanned: 100,
            rir: 1,
            exerciseId: exerciseId
        }
        const result = await createSet(set)

        expect(result.status).toBe(201)
    })
})