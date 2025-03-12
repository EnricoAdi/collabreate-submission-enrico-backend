import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import PreResponseWithValidation from "../middlewares/PreResponseWithValidation";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import GetUserSessionUseCase from "../use-case/auth/GetUserSessionUseCase";
import CreateTransactionUseCase from "../use-case/transaction/CreateTransactionUseCase";
import PreResponse from "../middlewares/PreResponse";
import FetchTransactionUseCase from "../use-case/transaction/FetchTransactionUseCase";
import DeleteTransactionUseCase from "../use-case/transaction/DeleteTransactionUseCase";
// import RegisterUseCase from "../../use-case/auth/RegisterUseCase";

const schemaPost = Joi.object({  
  name: Joi.string().max(30).required(), 
  value: Joi.number().required(), 
  type: Joi.string().valid("I","E").required(), 
  date: Joi.string().required()
});

async function handlerPost(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    const {name, value, date, type} = data as {name:string, value:string, date:string,type:string}
    await CreateTransactionUseCase.execute(userSession.user_id,name, value, date, type) 
    return NextResponse.json({
      message: "Add new transaction succeed"
    },{status:201})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
const schemaDelete = Joi.object({  
  transaction_id: Joi.number().required()
});

async function handlerDelete(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    const {transaction_id} = data as {transaction_id:string}
    const res = await DeleteTransactionUseCase.execute(userSession.user_id,parseInt(transaction_id)) 
    return NextResponse.json({
      message: `Delete transaction ${res.name} - ${res.created_at} succeed`
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
async function handlerGet(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req) 
    const res = await FetchTransactionUseCase.execute(userSession.user_id) 
    return NextResponse.json({
      message: "Fetch transaction succeed",
      data: res
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export const DELETE = PreResponseWithValidation(handlerDelete,schemaDelete)
export const POST = PreResponseWithValidation(handlerPost,schemaPost)
export const GET = PreResponse(handlerGet)