import Voluntario from "../entities/voluntario.entity";
import Refugio from "../../refugios/entities/refugio.entity";

export class VoluntarioRepository {
  async findAll() {
    return await Voluntario.findAll({ include: [Refugio] });
  }

  async findById(id: number) {
    return await Voluntario.findByPk(id, { include: [Refugio] });
  }

  async create(data: any) {
    return await Voluntario.create(data);
  }

  async update(id: number, data: any) {
    const voluntario = await Voluntario.findByPk(id);
    if (!voluntario) return null;
    return await voluntario.update(data);
  }

  async delete(id: number) {
    return await Voluntario.destroy({ where: { id } });
  }
}