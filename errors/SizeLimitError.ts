import StandardError from "./StandardError";

export default class SizeLimitError extends StandardError {
    type = "LIMITATION ERROR";
    constructor(message?: string) {
        super(400);
        if(message) this.messages.push(message)
        else this.messages = ["The size is too large, try a smaller size!"]
    }
}