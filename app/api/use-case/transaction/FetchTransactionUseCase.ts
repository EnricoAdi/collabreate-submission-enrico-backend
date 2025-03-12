import NotFoundError from "../../../../errors/NotFoundError"
import User from "../../repository/User"
import Transaction from "../../repository/Transaction"
import TRANSACTION from "../../../../types/enums/transaction.enum"
import { convertToRFCFromString } from "../../../../utils/Date"

const FetchTransactionUseCase = {
  async execute(user_id:number){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
     
    const res = await Transaction.fetch(user_id)
    let parsedRes:any[] = []
    res.forEach((item)=>{
      let value = "$"+item.value
      if(item.type == TRANSACTION.EXPENSE){
        value = "-"+value
      }
      parsedRes.push({
        transaction_id: item.transaction_id,
        name: item.name,
        value: value,
        date: convertToRFCFromString(item.date.toISOString()),
        type: item.type,
        transaction_code: item.transaction_code
      })
    })
    return parsedRes
  },
  async executeFilter(user_id:number,q:string,type:string){
    //type between ALL, I, E
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    let res:any[] = []
    if(type==TRANSACTION.ALL){
      res = await Transaction.fetchWithFilter(user_id,q)
    }else{
      res = await Transaction.fetchWithFilterType(user_id,q,type)
    }
    let parsedRes:any[] = []
    res.forEach((item)=>{
      let value = "$"+item.value
      if(item.type == TRANSACTION.EXPENSE){
        value = "-"+value
      }
      parsedRes.push({
        transaction_id: item.transaction_id,
        name: item.name,
        value: value,
        date: convertToRFCFromString(item.date.toISOString()),
        type: item.type,
        transaction_code: item.transaction_code
      })
    })
    return parsedRes
  },
  async executeGetUserDetail(user_id:number){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    let allTransactions = await Transaction.fetch(user_id)
    let totalIncome = 0
    let totalExpense = 0
    allTransactions.forEach((item)=>{
      if(item.type == TRANSACTION.INCOME){
        totalIncome += item.value
      }else{
        totalExpense += item.value
      }
    })
    return {
      totalIncome,
      totalExpense
    }
  },
  async executeReport(user_id:number,type:string="allTime"){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    let startDate: Date;
    const today = new Date();
    if (type === 'weekly') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
    } else if (type === 'monthly') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1); 
    } else {
      startDate = new Date(today.getFullYear(), 0, 1);
    }

    let incomes = await Transaction.fetchReport(user_id,TRANSACTION.INCOME,startDate)
    let expenses = await Transaction.fetchReport(user_id,TRANSACTION.EXPENSE,startDate)
    let parseIncome = incomes.map((item)=>{
      return {
        date: item.date,
        value: item._sum.value
      }
    })
    let parseExpense = expenses.map((item)=>{
      return {
        date: item.date,
        value: item._sum.value
      }
    })
    let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    if(type=="monthly"){
      labels = ["1", "5", "10", "15", "20", "25", "30"]
    }else if(type=="allTime"){
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    return {
      labels,
      incomes: parseIncome,
      expenses:parseExpense
    }
  }
}
export default FetchTransactionUseCase