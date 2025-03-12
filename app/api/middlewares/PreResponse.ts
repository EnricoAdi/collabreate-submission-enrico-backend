import { NextRequest, NextResponse } from 'next/server';
import ExtractValue from '../utils/ExtractValue';
/**
 * Method ini digunakan untuk memvalidasi request sebelum di proses oleh handler.
 * Hal yang divalidasi di sini adalah apakah body atau query dari request sesuai dengan schema JOI yang diberikan.
 * @param handler 
 * @returns 
 */
const PreResponse = (
  handler: (req:NextRequest, data:object)=>void
)=> {
  return async(req:NextRequest)=>{
    let objectToValidate = await ExtractValue(req) 
    return handler(req, objectToValidate)
  }
}
export default PreResponse