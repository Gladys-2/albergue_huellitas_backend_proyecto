import Administrador from "../entities/administrador.entity";

export const findAllAdmins = () => Administrador.findAll({ include: ["Usuario"] });
export const findAdminById = (id: number) => Administrador.findByPk(id);
export const createAdmin = (data: any) => Administrador.create(data);
export const updateAdmin = (admin: any, data: any) => admin.update(data);
export const deleteAdmin = (admin: any) => admin.destroy();