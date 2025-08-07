import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export class PasswordHasher{
    async hashPassword(password){
        const salt= await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }
    
    async compare(pass,hashed){
        return await bcrypt.compare(pass,hashed);
    }

    async createToken(data){        
        delete data.password;
        // console.log("Data ",data);
        const token= jwt.sign(data,process.env.JWT_SECRET,{
            expiresIn: '1h',            
        });        
        return {token,data};
    }
}