import StandardError from "./StandardError";

export default class ForbiddenError extends StandardError {
    type = "FORBIDDEN ERROR";
    constructor(message?: string) {
        super(403);
        this.messages = ["You are not allowed to acces this, please contact your provider"]
        if(message) this.messages.push(message)
    }
}