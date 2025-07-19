import prisma from '../../../../src/utils/prismaClient';

beforeAll(cleanUsers);

async function cleanUsers() {
  {
    await prisma.$queryRaw`DELETE FROM "User"`
  }
}

test("GET on /register", async () => {
  const userRegister = {
    name: "Leonado",
    email: "leo@email.com",
    password: "123456",
    telephone: "6199982756",
    height: 183,
    weight: 99
  }

  const result = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userRegister)
  })

  const convertResult = await result.json()
  expect(result.status).toBe(201)
  expect(convertResult.message).toBe('user created')
})