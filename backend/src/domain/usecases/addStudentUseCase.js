import {Student} from '../entities/student.js';

export class StudentUseCase{
    constructor(studentRepository){
        this.studentRepository=studentRepository;
    }

    async execute(data){
        
        const student = new Student(data);
        // console.log("Use CAse",student);      
        const savedStudent= await this.studentRepository.saveToDb(student);
        return savedStudent;
    }
}