import {Student} from '../entities/student.js';

export class StudentUseCase{
    constructor(studentRepository,passwordHasher){
        this.studentRepository=studentRepository;
        this.passwordHasher= passwordHasher;
      }
    async execute(data){      
    //    console.log("Entered use case");
        const password= await this.passwordHasher.hashPassword(data.password);
        data.password=password;          
        // console.log("Created password ",password);
        const student = new Student(data);
        const isExists= await this.studentRepository.findByEmail(data.email_id);
        if(!isExists){            
        const savedStudent= await this.studentRepository.saveToDb(student);
        return savedStudent;
        }
        return null;
        
    }

    async allowAccess(data){
        console.log("Data from useCase",data)
        const student= await this.studentRepository.findByEmail(data.email_id);
        console.log("Student ",student);
        if(!student){
             throw new Error("Student not found");
        }
        const isMatch= await this.passwordHasher.compare(data.password,student.password);
        console.log("Allow Access ", isMatch);
        // return isMatch;

        if(!isMatch){
            throw new Error('Invalid Credentials');            
        }
        const res= await this.passwordHasher.createToken(student);
        return res;

    }
}