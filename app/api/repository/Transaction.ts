import { Prisma } from "@prisma/client";
import { IRepository } from "./_IRepository";
import prisma from "../../../services/Prisma";

export default new class Transaction implements IRepository {
  create(newTransaction : Prisma.transactionCreateInput) {
    return prisma.transaction.create({
      data : newTransaction
    }) 
  }
  update(transaction_id:number, data:Prisma.transactionUpdateInput) {
    return prisma.transaction.update({
      where:{
          transaction_id
      },
      data
    })
  }
  
  async changePassword(username:string, hashed_password:string){
    return prisma.user.update({
        where : {
            username
        },
        data : {
            password: hashed_password
        }
    })
}
  delete(transaction_id:number) {
    return prisma.transaction.update({
      where:{
          transaction_id
      },
      data:{
        deleted_at: new Date()
      }
    })
  }
  get(transaction_id:number) {
    return prisma.transaction.findFirst({
      where:{
          transaction_id
      }
    })
  }
  getLatestCode(type:string) {
    return prisma.transaction.findFirst({
      where:{
        type
      },
      orderBy:{
        transaction_id: "desc"
      }
    })
  } 
  fetch(user_id:number){
    return prisma.transaction.findMany({
      where:{
        user_id,
        deleted_at: null
      },
      orderBy:{
        date: "asc"
      }
    })
  }
  fetchReport(user_id:number,type:string,startDate:Date){
    return prisma.transaction.groupBy({
      by:["date"],
      where:{
        user_id,
        deleted_at: null,
        type,
        date:{
          gte:startDate
        }
      },
      _sum:{
        value:true
      }
    })
  }
  fetchWithFilter(user_id:number, q:string){
    return prisma.transaction.findMany({
      where:{
        user_id,
        deleted_at: null,
        name:{
          contains:q
        }
      },
      orderBy:{
        date: "asc"
      }
    })
  }
  fetchWithFilterType(user_id:number, q:string, type:string){
    return prisma.transaction.findMany({
      where:{
        user_id,
        deleted_at: null,
        name:{
          contains:q
        },
        type
      },
      orderBy:{
        date: "asc"
      }
    })
  }
}

