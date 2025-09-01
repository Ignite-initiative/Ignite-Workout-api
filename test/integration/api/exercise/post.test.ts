import prisma from "../../../../src/utils/prismaClient"
import jwt from "jsonwebtoken"

describe("POST on /exercise", () => {
    let userId: string
    let workoutId: string
    let token: string

    beforeAll(async () => {
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

        userId = user.id

        const workout = await prisma.workout.create({
            data: {
            name: "treino 1",
            date: new Date('2011-11-11'),
            isCompleted: false,
            userId: userId
            }
        })

        workoutId = workout.id
        
        token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY || "testkey",
            { expiresIn: '12h' }
        );
    })

    afterEach(async () => {
        await prisma.exercise.deleteMany()
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany
        await prisma.$disconnect()
    })

    type createExercisePayload = {
        name: string,
        category: string,
        workoutId: string
    }

    async function createExercise(exercise: createExercisePayload) {
        const result = await fetch('http://localhost:3000/api/v1/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(exercise)
        })
        return result;
    }

    test("Should return a status 201 at sucess ", async () => {
        const exercise = {
            name: "Brench Press",
            category: "chest",
            workoutId: workoutId
        }
        const result = await createExercise(exercise)

        expect(result.status).toBe(201)
    })
})