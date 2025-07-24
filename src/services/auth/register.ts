import { Request, Response } from "express";
import { UserRepository } from "../../repositories/user-repository";
import { EmailAlreadyExists } from "../errors/email-already-exists";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterServiceRequest{
        name: string,
        email:string,
        password:string,
        telephone:string | null, 
        height: number,
        weight: number,
}
interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private userRepository: UserRepository){}

    async execute({name, email, password, telephone, height, weight}: RegisterServiceRequest): Promise<RegisterServiceResponse> {

        const password_hash = await hash(password, 10)
    
        const emailUsed = await this.userRepository.getByEmail(email)
        
        if(emailUsed) {
            throw new EmailAlreadyExists()
        }

        const user = await this.userRepository.create({name, email, password_hash, telephone, height, weight})
        
        return { user }
    }

}