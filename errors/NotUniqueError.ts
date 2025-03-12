import StandardError from "./StandardError";

export default class NotUniqueError extends StandardError {
    type = "NOT UNIQUE ERROR";
    constructor(message?: string) {
        super(400);
        if(message) this.messages.push(message)
        else this.messages = ["The unique code or identifier you're inputting is not unique"]
    }
}