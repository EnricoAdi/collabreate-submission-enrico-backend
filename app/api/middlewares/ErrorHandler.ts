import StandardError from '../../../errors/StandardError'; 
import { NextResponse } from 'next/server';

/**
 * Method ini digunakan untuk menangani error yang terjadi pada handler. Nantinya, method ini akan menangkap semua throw error dari endpoint, lalu mengembalikan response sesuai dengan error yang terjadi.
 * @param err 
 * @param req 
 * @param res 
 * @returns 
 */
export const ErrorHandler = (
  err: Error,
) => {
  console.log(err)
  if (err instanceof StandardError) {
    return NextResponse.json({
      err
    },{status:err.statusCode})
  }
  return NextResponse.json({
    error: 'Internal Server Error'
  },{status:500}) 
}