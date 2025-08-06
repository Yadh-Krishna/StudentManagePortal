import { StudentController } from "../application/controllers/studentController.js";
import { StudentRepository } from "../domain/repositories/StudentRepository.js";
import { StudentUseCase } from "../domain/usecases/addStudentUseCase.js";
import { PasswordHasher } from "../infrastructure/services/hashPassword.js";
// import { Student } from "../domain/entities/student.js";
export const makeStudentController = () => {
  const repo = new StudentRepository();
  const hasher = new PasswordHasher();
  const useCase = new StudentUseCase(repo, hasher);

  return new StudentController(useCase);
};

// export const studentEntity=((data)=> new Student(data));

// export const passwordHasher=new PasswordHasher();