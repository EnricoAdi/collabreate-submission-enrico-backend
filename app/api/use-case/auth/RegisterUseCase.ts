import User from "@/app/api/repository/User"
import NotUniqueError from "@/errors/NotUniqueError" 
const bcrypt = require('bcrypt') 
const RegisterUseCase = {
  async execute(username:string, password:string, name:string){
    let cekUser = await User.get(username)
    if(cekUser){ 
        throw new NotUniqueError("Username already exist")
    }
    const hashedPass = await bcrypt.hash(password,10)
    const user = {
      username,
      password: hashedPass,
      name
    }
    const userReturn = await User.create(user)
    return userReturn
  }
}
export default RegisterUseCase