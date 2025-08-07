import { StudentController } from "../application/controllers/studentController.js";
import { StudentRepository } from "../domain/repositories/StudentRepository.js";
import { StudentUseCase } from "../domain/usecases/addStudentUseCase.js";
import { PasswordHasher } from "../infrastructure/services/hashPassword.js";
// import { Student } from "../domain/entities/student.js";
import { StudentUpdateProfileImageUseCase } from "../domain/usecases/studentUpdateProfileImageUseCase.js";
import { CloudinaryService } from "../domain/services/cloudinaryServices.js";

export const makeStudentController = () => {
  const studentRepository = new StudentRepository();
  const passwordHasher = new PasswordHasher();
  const useCase = new StudentUseCase(studentRepository, passwordHasher);

  const uploadUseCase = new StudentUpdateProfileImageUseCase(
    studentRepository,
    new CloudinaryService()
  );

  const controller = new StudentController(useCase);
  controller.useCase.uploadProfileImage = uploadUseCase.execute.bind(uploadUseCase); 
  return controller;
};

