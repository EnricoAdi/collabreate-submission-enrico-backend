import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "@/app/api/middlewares/PreResponseWithValidation";
import { ErrorHandler } from "@/app/api/middlewares/ErrorHandler";
import LoginUseCase from "../../use-case/auth/LoginUseCase";
const jwt = require("jsonwebtoken")

const schemaPost = Joi.object({ 
  username: Joi.string().required(),
  password: Joi.string().required().messages({
      "string.empty":"Password have to be filled",
  })
});

async function handlerPost(req: NextRequest, data:object){
  try {
    const {username, password} = data as {username:string, password:string}
    const user = await LoginUseCase.execute(username, password)
    const token = jwt.sign(user, process.env.NEXTAUTH_SECRET, {
      expiresIn: "1d",
    });
    return NextResponse.json({
      message: "Login succeed",
      user: {
        ...user,
        token
      }
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export const POST = PreResponseWithValidation(handlerPost,schemaPost)