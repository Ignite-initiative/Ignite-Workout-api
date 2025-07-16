import { InMemoryUserRepository } from "../../../src/repositories/in-memory/in-memory-user-repository";
import { LoginService } from "../../../src/services/user/login"
import { RegisterService } from "../../../src/services/user/register"
import { UserController } from "../../../src/controllers/user/user-controller"

const inMemoryRepository = new InMemoryUserRepository
const loginService = new LoginService(inMemoryRepository)
const registerService = new RegisterService(inMemoryRepository)

beforeEach( async () => {
    const user = await registerService.execute({
        name: "test",
        email: "email@test.com",
        password: "password",
        telephone: "123123123",
        height: 1.67,
        weight: 81.6 
    })
    return user
  });
  
afterEach( async () => {
    const userDeleted = await inMemoryRepository.delete()

    return userDeleted
});

describe("Test login service", () => {
    it("1) Should be generate a token", async () => {
        const userLogin = await loginService.execute({
            email: "email@test.com",
            password: "password", 
        })
        expect(userLogin).toBeTruthy();
    })
})