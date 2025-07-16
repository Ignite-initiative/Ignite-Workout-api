import { Set } from "@prisma/client";
import { SetRepository } from "../../repositories/set-respository";

interface CreateSetRequest { 
    category: string | undefined; 
    repsPlanned: number; 
    weightPlanned: number; 
    datePLanned: string | Date; 
    repsCompleted: number | null | undefined; 
    weightUsed: number | null | undefined; 
    dateCompleted: string | undefined; 
    rir: number | undefined; 
    exercise: string
}

interface CreateSetResponse {
    set: Set
}

export class CreateSet {
    constructor(private setRepository: SetRepository){}

    async execute({category, repsPlanned, weightPlanned, datePLanned, repsCompleted, weightUsed, dateCompleted, rir, exercise}: CreateSetRequest): Promise<CreateSetResponse> {
        return await this.setRepository.create({category, repsPlanned, weightPlanned, datePLanned, repsCompleted, weightUsed, dateCompleted, rir, exercise})
    }
}