import Joi from 'joi';
import JoiError from '@/errors/JoiError';
import { NextRequest, NextResponse } from 'next/server';
import ExtractValue from '../utils/ExtractValue';
/**
 * @param handler 
 * @param schema 
 * @returns 
 */
const PreResponseWithValidation = (
  handler: (req:NextRequest, data:object)=>void,
  schema: Joi.Schema
)=> {
  return async(req:NextRequest)=>{
    let objectToValidate = await ExtractValue(req)
    
    const { error } = schema.validate(objectToValidate);
    if (error) {
        const err = new JoiError(error)
        
        return NextResponse.json({err},{status:400}); 
    }
    return handler(req, objectToValidate)
  }
}
export default PreResponseWithValidation