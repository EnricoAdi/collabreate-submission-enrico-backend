import User from "@/app/api/repository/User"
import CustomError from "@/errors/CustomError"
import NotFoundError from "@/errors/NotFoundError"
import { convertToRFCFromString } from "@/utils/Date"
const bcrypt = require('bcrypt')

const LoginUseCase = {
  async execute(username:string, password:string){
    let cekUser = await User.get(username)
    if(!cekUser){ 
        throw new NotFoundError("Username not found")
    }
    const checkPass = await bcrypt.compare(password, cekUser?.password) 
    if(checkPass){ 
      cekUser.password = "" 
      const user = {
        user_id: cekUser.user_id,
        username: cekUser.username,
        name: cekUser.name,
        created_at: convertToRFCFromString(cekUser.created_at.toISOString())
      }
      return user
    }else{
        throw new CustomError("Incorrect password")
    }
  }
}
export default LoginUseCase