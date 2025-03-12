import NotFoundError from "../../../../errors/NotFoundError"
import User from "../../repository/User"
import Transaction from "../../repository/Transaction"
import TRANSACTION from "../../../../types/enums/transaction.enum"

const CreateTransactionUseCase = {
  async execute(user_id:number,name:string, value:string, date:string,type:string){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    let prefix = "INC-"
    if(type==TRANSACTION.EXPENSE){
      prefix = "EXP-"
    }
    //get latest
    let latestCode = await Transaction.getLatestCode(type)
    let transaction_code = prefix + "1".padStart(5,"0")
    //cut the prefix
    if(latestCode){
      let latestNumberSequence = latestCode.transaction_code.substring(4)
      let newSequence = parseInt(latestNumberSequence)+1
      transaction_code = prefix + newSequence.toString().padStart(5,"0")
    }
    await Transaction.create({
      name,
      value: parseInt(value),
      date: new Date(date),
      type,
      transaction_code,
      user:{
        connect:{
          user_id
      }}
    })
  }
}
export default CreateTransactionUseCase