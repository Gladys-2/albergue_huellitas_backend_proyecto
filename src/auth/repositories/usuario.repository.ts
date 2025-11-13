import Usuario from "../entities/usuario.entity";

export class UsuarioRepository {
  async findAll() {
    return await Usuario.findAll({ attributes: { exclude: ["contrasena"] } });
  }

  async findById(id: number) {
    return await Usuario.findByPk(id, { attributes: { exclude: ["contrasena"] } });
  }

  async findByEmail(correo_electronico: string) {
    return await Usuario.findOne({ where: { correo_electronico } });
  }

  async create(data: any) {
    return await Usuario.create(data);
  }

  async update(id: number, data: any) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    return await usuario.update(data);
  }

  async delete(id: number) {
    return await Usuario.destroy({ where: { id } });
  }
}