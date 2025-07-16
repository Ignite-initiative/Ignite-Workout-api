import { RegisterService } from '../../../src/services/user/register'
import { InMemoryUserRepository } from '../../../src/repositories/in-memory/in-memory-user-repository'

const repository = new InMemoryUserRepository
const register = new RegisterService(repository)

describe("Testing Register Service", () => {
    it("should to register", async () => {
        const result = await register.execute({
            name: "test",
            email: "email@test.com",
            password: "password",
            telephone: "123123123",
            height: 1.67,
            weight: 81.6
        })

        expect(result.user.id).toBeDefined();
    })
})