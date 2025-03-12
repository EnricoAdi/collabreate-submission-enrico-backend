import StandardError from "./StandardError";

export default class NotFoundError extends StandardError{
    type = "VALIDATION ERROR";
    constructor(message:string) {
        super(404);
        this.messages = [message]
    }
}