import { Prisma } from "@prisma/client";
import { IRepository } from "./_IRepository";
import prisma from "../../../services/Prisma";

export default new class User implements IRepository {
  create(newUser : Prisma.userCreateInput) {
    return prisma.user.create({
      data : newUser
    }) 
  }
  update(user_id:number, data:Prisma.userUpdateInput) {
    return prisma.user.update({
      where:{
          user_id
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
  delete() {
    
  }
  get(username:string) {
    return prisma.user.findFirst({
      where:{
        username
      }
    })
  }
  getById(id:string|number) {
    return prisma.user.findFirst({
      where:{
        user_id: parseInt(id as string)
      }
    })
  }
  fetch(){}
}

