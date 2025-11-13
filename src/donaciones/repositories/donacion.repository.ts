import Donacion from "../entities/donacion.entity";
import Usuario from "../../usuarios/entities/usuario.entity";

export class DonacionRepository {
  async findAll() {
    return await Donacion.findAll({ include: [Usuario] });
  }

  async findById(id: number) {
    return await Donacion.findByPk(id, { include: [Usuario] });
  }

  async create(data: any) {
    return await Donacion.create(data);
  }
}