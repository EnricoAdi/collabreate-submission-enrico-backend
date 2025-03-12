import NotFoundError from "@/errors/NotFoundError";
import User from "@/app/api/repository/User"; 
const bcrypt = require('bcrypt')

const ChangeUserData = {
  async execute(user_id:number, username:string, name:string, email:string, phone:string, role:number){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    await User.update(user_id, {username, name})
  },
  async executePassword(user_id:number, password:string){
    const user = await User.getById(user_id)
    if(!user) throw new NotFoundError("User not found")
    const hashedPass = await bcrypt.hash(password,10)
    await User.update(user_id, {password:hashedPass})
  }
}
export default ChangeUserData;