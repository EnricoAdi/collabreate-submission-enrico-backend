import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "@/app/api/middlewares/PreResponseWithValidation";
import { ErrorHandler } from "@/app/api/middlewares/ErrorHandler";
import GetUserSessionUseCase from "../../use-case/auth/GetUserSessionUseCase"; 
import FetchTransactionUseCase from "../../use-case/transaction/FetchTransactionUseCase"; 
import TRANSACTION from "@/types/enums/transaction.enum";

const schemaGet = Joi.object({   
  type: Joi.string().valid("allTime","monthly","weekly").required()
});

async function handlerGet(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    let {type} = data as {type:string}
    if(type=="") type = "allTime"
    const res = await FetchTransactionUseCase.executeReport(userSession.user_id,type) 
    return NextResponse.json({
      message: `Fetch transaction report succeed`,
      data:res
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
export const GET = PreResponseWithValidation(handlerGet,schemaGet)