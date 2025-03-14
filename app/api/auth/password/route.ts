import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "../../middlewares/PreResponseWithValidation";
import GetUserSessionUseCase from "../../use-case/auth/GetUserSessionUseCase";
import { ErrorHandler } from "../../middlewares/ErrorHandler";
import ChangeUserData from "../../use-case/auth/ChangeUserData";

const schemaPut = Joi.object({ 
  password: Joi.string().min(6).required().messages({
      "string.empty":"Password harus diisi",
      'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, dan angka',
  }),
  confirm: Joi.string().required().equal(Joi.ref('password')).messages({
    "any.only": "Konfirmasi password harus sama dengan password"
    }),
});

async function handlerPut(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    let user_id = userSession.user_id
    const {password} = data as {password:string}
    await ChangeUserData.executePassword(user_id, password)
    
    return NextResponse.json({
      message: "Sukses mengubah password"
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export const PUT = PreResponseWithValidation(handlerPut,schemaPut)