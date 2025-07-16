import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'crypto'


export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            telephone: data.telephone ?? null,
            height: data.height,
            weight: data.weight,
            createdAt: new Date(),
          }

        this.items.push(user)

        console.log('Usuários armazenados:', this.items);
        return user
    }
    
    async getByEmail(email: string): Promise<User | null> {
        const user = this.items.find((user) => user.email == email) || null

        return user
        
    }

    async delete() {
        const deleteUser = this.items.shift()

        return deleteUser
    }
}