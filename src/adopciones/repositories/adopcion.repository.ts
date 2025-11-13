import Usuario from "../../usuarios/entities/usuario.entity";
import Animal from "../../animales/entities/animal.entity";
import Adopcion from "../entities/adopcion.entity";

export class AdopcionRepository {
  async findAll() {
    return await Adopcion.findAll({ include: [Usuario, Animal] }); // <-- usar Usuario, no User
  }

  async findById(id: number) {
    return await Adopcion.findByPk(id, { include: [Usuario, Animal] }); // <-- mismo aquí
  }

  async create(data: any) {
    return await Adopcion.create(data);
  }
}