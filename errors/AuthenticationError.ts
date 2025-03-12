import StandardError from "./StandardError";

export default class AuthenticationError extends StandardError {
    type = "AUTHENTICATION ERROR";
    constructor() {
        super(401);
        this.messages = ["You are not authenticated"]
    }
}