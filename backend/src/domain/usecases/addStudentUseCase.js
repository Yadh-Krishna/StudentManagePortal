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
        // console.log("Data from useCase",data)
        const student= await this.studentRepository.findByEmail(data.email_id);
        // console.log("Student ",student);
        if(!student){
             throw new Error("Student not found");
        }
        const isMatch= await this.passwordHasher.compare(data.password,student.password);
        // console.log("Allow Access ", isMatch);
        // return isMatch;

        if(!isMatch){
            throw new Error('Invalid Credentials');            
        }
        const res= await this.passwordHasher.createToken(student);
        return res;

    }
        async updateStudentProfile(studentId, data) {
        const existingStudent = await this.studentRepository.findById(studentId);
        if (!existingStudent) throw new Error("Student not found");

        const updatedData = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            address: data.address,
            email_id: data.email_id,
            dob: data.dob,
        };

        if (data.password && data.password.trim() !== "") {
            updatedData.password = await this.passwordHasher.hashPassword(data.password);
        }

        const updatedStudent = await this.studentRepository.updateStudentById(studentId, updatedData);
        return updatedStudent;
        }
}