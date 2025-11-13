import Refugio from "../entities/refugio.entity";

export class RefugioRepository {
  async findAll() {
    return await Refugio.findAll();
  }

  async findById(id: number) {
    return await Refugio.findByPk(id);
  }

  async create(data: any) {
    return await Refugio.create(data);
  }

  async update(id: number, data: any) {
    const refugio = await Refugio.findByPk(id);
    if (!refugio) return null;
    return await refugio.update(data);
  }

  async delete(id: number) {
    return await Refugio.destroy({ where: { id } });
  }
}