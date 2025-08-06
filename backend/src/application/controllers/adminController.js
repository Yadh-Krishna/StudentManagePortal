import { AdminValidator } from "../../validators/AdminValidator.js";

export class AdminController{
    constructor(useCase){
        this.useCase = useCase;
    }
     async login(req,res){

        // console.log("Admin COntroller",req.body);
        const data= req.body;
        
        const errors=AdminValidator.validate(data);

        if(errors.length>0)
            return res.status(400).json({errors});     

        try {
            // const allowAccess= await this.useCase.allowAdminAccess(data);
            const obj= await this.useCase.allowAdminAccess(data);   
            console.log("Result ",obj);         
            return res.status(200).json({obj});
        } catch (error) {
            return res. status(400).json({message:error.message})
        }

    }

     async createUser(req,res){
        const data= req.body;
        const errors=StudentValidator.validate(data);

        if(errors.length>0)
           return res.status(400).json({errors});

        const reposit= new StudentRepository();
        const hasher = new PasswordHasher();       
        const useCase= new StudentUseCase(reposit,hasher);

        try{
            const student= await useCase.execute(data);
            if(student)
                 res.status(200).json({message:"Student Created",student});
        }catch(err){
             res.status(500).json({error:err.message});
        }
    }
}