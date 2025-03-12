import { NextApiRequest, NextApiResponse, GetServerSidePropsContext } from "next"
import AuthorizationError from "../../../../errors/AuthorizationError" 
import { NextRequest } from "next/server";
import { DateTime } from "luxon"; 
const jwt = require("jsonwebtoken") 

interface UserProfileSession {
  username: string,
  user_id: number,
  name: string,
  created_at: DateTime
} 

const GetUserSessionUseCase = {
  async _validateServerSession(token:string|null){
    if(!token) throw new AuthorizationError()
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      const user = decoded as UserProfileSession
      if(!user) throw new AuthorizationError() 
      return user
      
    } catch (error:any) {
      throw new AuthorizationError(error)
    } 
  },
  async execute(req: NextRequest){ 
    const authHeader = Object.fromEntries(req.headers.entries()).authorization;
    const token = authHeader.split(' ')[1];
    const user = await this._validateServerSession(token)
    return user
  }
}
export default GetUserSessionUseCase