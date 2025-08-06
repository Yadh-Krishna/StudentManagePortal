import { AdminController } from "../application/controllers/adminController.js";
import { AdminRepository } from "../domain/repositories/AdminRepository.js";
import { AdminUseCase } from "../domain/usecases/adminUseCase.js";
import { PasswordHasher } from "../infrastructure/services/hashPassword.js";

export const makeAdminController = () => {
  const repo = new AdminRepository();
  const hasher = new PasswordHasher();
  const useCase = new AdminUseCase(repo, hasher);

  return new AdminController(useCase);
};

// export const passwordHasher=new PasswordHasher();