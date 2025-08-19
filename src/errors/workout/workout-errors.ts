export class workoutNotFound extends Error {
    constructor(){
        super("Workout not found.")
    }
}