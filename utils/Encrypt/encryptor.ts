import CryptoJS from "crypto-js";
export const encryptor = (id:string):string=>{
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(id),
        process.env.ENCRYPT_SECRET as string
    ).toString();

    let encryptBuffer = Buffer.from(encrypted).toString('base64') 
    return encryptBuffer
}
 