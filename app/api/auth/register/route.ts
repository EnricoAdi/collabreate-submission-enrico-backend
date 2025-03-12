import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "../../middlewares/PreResponseWithValidation";
import { ErrorHandler } from "../../middlewares/ErrorHandler";
import RegisterUseCase from "../../use-case/auth/RegisterUseCase";

const schemaPost = Joi.object({ 
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().max(30).required(),
  password: Joi.string().min(6).required().messages({
      "string.empty":"Password have to be filled",
  }),
  confirm: Joi.string().required().equal(Joi.ref('password')).messages({
    "any.only": "Password confirmation must be the same as password"
    }),
});

async function handlerPost(req: NextRequest, data:object){
  try {
    const {username, password, name} = data as {username:string, password:string, name:string}
    await RegisterUseCase.execute(username, password, name)
    return NextResponse.json({
      message: "Register user succeed"
    },{status:201})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export const POST = PreResponseWithValidation(handlerPost,schemaPost)