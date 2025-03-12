import StandardError from "./StandardError";
import {ValidationError} from "joi";

export default class JoiError extends StandardError {
    type = "VALIDATION ERROR";
    constructor(e: ValidationError) {
        super(400);
        this.messages = e.details.map(detail=>{
            return detail.message.replace(/\"/g,"") // Remove all double quotes
        })
    }
}