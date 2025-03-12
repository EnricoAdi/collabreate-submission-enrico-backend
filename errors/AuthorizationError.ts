import StandardError from "./StandardError";

export default class AuthorizationError extends StandardError {
    type = "AUTHORIZATION ERROR";
    constructor(message?: string) {
        super(403);
        this.messages = [message??"You are not authorize to do this, please contact your root user"]
    }
}