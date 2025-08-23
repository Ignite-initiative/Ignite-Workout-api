import prisma from "../../../../src/utils/prismaClient";
import jwt from 'jsonwebtoken'

describe("POST on /workout", () => {
    let userId: string
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

        userId = user.id

        token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
            }, 
            process.env.JWT_SECRET_KEY || "testkey", 
            { expiresIn: '12h' }
        );
        workoutRegister.userId = user.id
    })

    afterAll(async () => {
        await prisma.workout.deleteMany()
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })

    const workoutRegister = {
            name: "treino 1",
            date: new Date('2011-11-11'),
            isCompleted: false,
            userId: ""
    }

    type createWorkoutPayload = {
        name: string,
        date: Date,
        isCompleted: boolean,
        userId: string; 
    }

    const requiredFields: (keyof createWorkoutPayload)[] = ["userId", "name", "date"]

    async function createWorkout(workout: createWorkoutPayload) {
        const result = await fetch('http://localhost:3000/api/v1/workout/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(workout)
        })
        return result; 
    }
    

    test("Should return a status 201 on success", async () => {
        const result = await createWorkout(workoutRegister)
        const convertResult = await result.json()
        expect(result.status).toBe(201)
        expect(convertResult.message).toBe('Workout Created!')
    })

    test.each(requiredFields)("Should return a status 400 if %s is not send", async (field) => {
        const {[field]: ignored, ...invalidWorkout} = workoutRegister
        const result = await createWorkout(invalidWorkout as any)
        expect(result.status).toBe(400)
    })
})