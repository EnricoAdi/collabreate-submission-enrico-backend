import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "@/app/api/middlewares/PreResponseWithValidation";
import { ErrorHandler } from "@/app/api/middlewares/ErrorHandler";
import GetUserSessionUseCase from "../../use-case/auth/GetUserSessionUseCase"; 
import FetchTransactionUseCase from "../../use-case/transaction/FetchTransactionUseCase"; 
import TRANSACTION from "@/types/enums/transaction.enum";

const schemaGet = Joi.object({  
  q: Joi.string().allow(''),
  type: Joi.string().valid("ALL","I","E").required()
});

async function handlerGet(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    let {q,type} = data as {q:string,type:string}
    if(type=="") type = TRANSACTION.ALL
    const res = await FetchTransactionUseCase.executeFilter(userSession.user_id,q,type) 
    return NextResponse.json({
      message: `Fetch transaction filter succeed`,
      data:res
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
export const GET = PreResponseWithValidation(handlerGet,schemaGet)