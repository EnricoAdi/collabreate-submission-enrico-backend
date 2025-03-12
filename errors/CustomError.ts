import StandardError from "./StandardError";

export default class CustomError extends StandardError {
    type = "FORBIDDEN ERROR";
    constructor(message?: string, code:number=400) {
        super(code);
        this.messages = [message??""]
    }
}