export class EmailAlreadyExists extends Error {
    constructor(){
        super('Email is already being used')
    }
}