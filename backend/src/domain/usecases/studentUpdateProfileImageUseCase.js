export class StudentUpdateProfileImageUseCase {
  constructor(studentRepository, cloudinaryService) {
    this.studentRepository = studentRepository;
    this.cloudinaryService = cloudinaryService;
  }

  async execute(filePath, studentId) {
    const imageUrl = await this.cloudinaryService.uploadImage(filePath);
    const updatedStudent = await this.studentRepository.updateProfileImage(studentId, imageUrl);
    return updatedStudent;
  }
}