import prisma from '../../../../src/utils/prismaClient';

describe("POST on /register - Account creation", () => {

  beforeEach(cleanUsers);

  async function cleanUsers() {
    {
      await prisma.$queryRaw`DELETE FROM "User"`
    }
  }

  const userRegister = {
    name: "Leonado",
    email: "leo@email.com",
    password: "123456",
    telephone: "6199982756",
    height: 183,
    weight: 99
  }

  async function createUser(user: {
    name?: string,
    email?: string,
    password?: string,
    telephone?: string | null,
    height?: number,
    weight?: number
  }) {
    const result = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return result;
  }

  test("Should return a status 201 on success", async () => {
    const result = await createUser(userRegister);
    const convertResult = await result.json()
    expect(result.status).toBe(201)
    expect(convertResult.message).toBe('user created')
  })

  test("Should return a status 201 on success even without telephone", async () => {
    const user = Object.assign(userRegister, { telephone: null });
    const result = await createUser(user);
    const convertResult = await result.json()
    expect(result.status).toBe(201)
    expect(convertResult.message).toBe('user created')
  })
  test("should return a 400 if name is not sent", async () => {
    const { name, ...userWithoutName } = userRegister
    const result = await createUser(userWithoutName)
    const convertResult = await result.json()
    expect(result.status).toBe(400)
  })
  test("should return a 400 if email is not sent", async () => {
    const { email, ...userWithoutEmail } = userRegister
    const result = await createUser(userWithoutEmail)
    const convertResult = await result.json()
    expect(result.status).toBe(400)
  })
  test("should return a 400 if password is not sent", async () => {
    const { password, ...userWithoutPassword } = userRegister
    const result = await createUser(userWithoutPassword)
    const convertResult = await result.json()
    expect(result.status).toBe(400)
  })
  test("should return a 400 if height is not sent", async () => {
    const { height, ...userWithoutHeight } = userRegister
    const result = await createUser(userWithoutHeight)
    const convertResult = await result.json()
    expect(result.status).toBe(400)
  })
  test("should return a 400 if weight is not sent", async () => {
    const { weight, ...userWithoutWeight } = userRegister
    const result = await createUser(userWithoutWeight)
    const convertResult = await result.json()
    expect(result.status).toBe(400)
  })
  test("should return a 401 if email already exists", async () => {
    const result = await createUser(userRegister);
    const repeatedResult = await createUser(userRegister)
    const convertResult = await repeatedResult.json()
    expect(repeatedResult.status).toBe(401)
    expect(convertResult.message).toBe('Email is already being used')
  })
})


