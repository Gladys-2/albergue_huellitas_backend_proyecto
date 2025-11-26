import { AppDataSource } from "../../config/db";
import { Administrador } from "../entities/administrador.entity";

const adminRepo = AppDataSource.getRepository(Administrador);

export const findAllAdmins = async (): Promise<Administrador[]> => {
  return await adminRepo.find({ relations: ["usuarios"] });
};

export const findAdminById = async (id: number): Promise<Administrador | null> => {
  return await adminRepo.findOne({ where: { id }, relations: ["usuarios"] });
};

export const createAdmin = async (data: Partial<Administrador>): Promise<Administrador> => {
  const admin = adminRepo.create(data);
  return await adminRepo.save(admin);
};

export const updateAdmin = async (admin: Administrador, data: Partial<Administrador>): Promise<Administrador> => {
  adminRepo.merge(admin, data);
  return await adminRepo.save(admin);
};

export const deleteAdmin = async (admin: Administrador): Promise<Administrador> => {
  return await adminRepo.remove(admin);
};