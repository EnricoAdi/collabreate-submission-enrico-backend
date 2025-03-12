import { NextRequest } from "next/server"

const ExtractQuery = (req:NextRequest)=>{
  let query = Object.fromEntries(new URL(req.url).searchParams)
  return query
}

const ExtractBodyFormData = async (req:NextRequest)=>{
  let formdata = await req.formData()
  let body = Object.fromEntries(formdata.entries());
  return body
}

const ExtractBody = async (req:NextRequest)=>{
  let body = await req.json() 
  return body
}

const ExtractValue = async (req:NextRequest)=>{
  if(req.method === 'GET' || req.method === 'DELETE'){
    return ExtractQuery(req)
  }else if(req.method === 'POST' || req.method === 'PUT'){
    let body = await ExtractBody(req)
    return body
  }
}
export default ExtractValue