import bcrypt from "bcrypt";
import secretWordModel from "../models/secretWordModel.js";
import userModel from "../models/userModel.js";
export const hashPassword=async(password)=>{
    try{
        const salt=5;
        const hashedPassword=await bcrypt.hash(password,5); 
        return hashedPassword;
    }catch(err){
        console.log(error);
    }
}

export const comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}

export const getRandomWords=async(size)=>{
    try {
        const document = await secretWordModel.findOne();
        const randomItems = document.list.sort(() => 0.5 - Math.random()).slice(0, size);
        return randomItems;
    } catch (error) {
        console.log(error)
    }
}
