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

    static async verifyAdminToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.admin = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    }
}