import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export class UserAuth{    
    static async userAuthentication(req,res,next){
        const authHeader = req.headers["authorization"]; 
        const token = authHeader && authHeader.split(" ")[1];
        if(!token) return res.status(401).json({message:"Token Expired"});

        try{
            const decoded= jwt.verify(token,process.env.JWT_SECRET);
            // console.log("Decoded ",decoded);
            req.user=decoded;
            next();
        }catch(err){
            console.log("Error from middleware ",err);
        }
    }
}