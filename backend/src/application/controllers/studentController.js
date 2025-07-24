
import { StudentValidator } from '../../validators/StudentValidator.js';
import { StudentUseCase } from '../../domain/usecases/addStudentUseCase.js';
import { StudentRepository } from '../../domain/repositories/StudentRepository.js';

export class StudentController{
    static async create(req,res){

        const data= req.body;
        // console.log("From PostMan",data);
        const errors= StudentValidator.validate(data);

        if(errors.length>0)
           return res.status(400).json({errors});

        const reposit= new StudentRepository();
        console.log("reposit", reposit)
        const useCase= new StudentUseCase(reposit);

        try{
            const student= await useCase.execute(data);
            if(student)
                 res.status(200).json({message:"Student Created",student});
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }
}