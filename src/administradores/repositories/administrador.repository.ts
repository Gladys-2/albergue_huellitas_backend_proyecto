import { AppDataSource } from "../../config/db";
import { Administrador } from "../entities/administrador.entity";

const adminRepo = AppDataSource.getRepository(Administrador);

// Obtener todos los administradores
export const findAllAdmins = async (): Promise<Administrador[]> => {
  return await adminRepo.find({ relations: ["usuarios"] });
};

// Obtener administrador por id
export const findAdminById = async (id: number): Promise<Administrador | null> => {
  return await adminRepo.findOne({ where: { id }, relations: ["usuarios"] });
};

// Crear administrador
export const createAdmin = async (data: Partial<Administrador>): Promise<Administrador> => {
  const admin = adminRepo.create(data);
  return await adminRepo.save(admin);
};

// Actualizar administrador
export const updateAdmin = async (admin: Administrador, data: Partial<Administrador>): Promise<Administrador> => {
  adminRepo.merge(admin, data);
  return await adminRepo.save(admin);
};

// Eliminar administrador
export const deleteAdmin = async (admin: Administrador): Promise<Administrador> => {
  return await adminRepo.remove(admin);
};