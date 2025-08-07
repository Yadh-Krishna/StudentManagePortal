
import { StudentValidator } from '../../validators/StudentValidator.js';
import fs from 'fs';

export class StudentController{
    constructor(useCase){
        this.useCase=useCase;
    }
     async create(req,res){
        const data= req.body;
        // console.log("From React",data);        
        delete data.confirmPassword;
        
        const errors= StudentValidator.validate(data,"login");
        // console.log("Errors ",errors);  
        if(errors.length>0)
           return res.status(400).json({errors});
        try{
            // console.log("Entered try");
            const student= await this.useCase.execute(data);
            console.log("Student ",student);
            if(student)
            return res.status(200).json({message:"Student Created",student});

            return res.status(400).json({message:"User Already Exists"});

        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

     async login(req,res){
        const data=req.body;
        // console.log("Data from React",data);
        const errors= StudentValidator.validate(data,"login");

        if(errors.length >0){
            //  console.log("Sending validation error response");
            return res.status(400).json({errors});
        }
        try{
            // console.log("Entered Try block with data ");
            const userDat= await this.useCase.allowAccess(data);   
            console.log("Result ",userDat);         
            return res.status(200).json({userDat});                      
        }catch(err){
            console.log("Error triggered ",err);
            return res.status(400).json({message:err.message});
        }       
    }

    async uploadProfileImage(req, res) {
     try {
        // console.log("Request from postMan ",req.file);
    const filePath = req.file.path;
    const studentId = req.user.id;

    const updatedStudent = await this.useCase.uploadProfileImage(filePath, studentId);
    fs.unlinkSync(filePath); 
    return res.status(200).json({ message:"Profile Picture uploaded Successfully",profileimageurl: updatedStudent.profileimageurl });
  } catch (err) {
    console.log("Upload Error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
}
}