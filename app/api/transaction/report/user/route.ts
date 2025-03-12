import { NextRequest, NextResponse } from "next/server"; 
import { ErrorHandler } from "@/app/api/middlewares/ErrorHandler";
import GetUserSessionUseCase from "../../../use-case/auth/GetUserSessionUseCase"; 
import FetchTransactionUseCase from "../../../use-case/transaction/FetchTransactionUseCase";
import PreResponse from "@/app/api/middlewares/PreResponse";
 

async function handlerGet(req: NextRequest, data:object){
  try {
    let userSession = await GetUserSessionUseCase.execute(req)
    const res = await FetchTransactionUseCase.executeGetUserDetail(userSession.user_id) 
    return NextResponse.json({
      message: `Fetch user transaction data succeed`,
      data:res
    },{status:200})
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
export const GET = PreResponse(handlerGet)