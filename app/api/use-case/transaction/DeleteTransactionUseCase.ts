import NotFoundError from "@/errors/NotFoundError"
import User from "../../repository/User"
import Transaction from "../../repository/Transaction" 
import AuthorizationError from "@/errors/AuthorizationError"

const DeleteTransactionUseCase = {
  async execute(user_id:number,transaction_id:number){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    
    let transaction = await Transaction.get(transaction_id)
    if(!transaction) throw new NotFoundError("Transaction not found")
    if(transaction.user_id != user_id) throw new AuthorizationError("You are not allowed to delete this transaction")
     
    return await Transaction.delete(transaction_id)
  }
}
export default DeleteTransactionUseCase