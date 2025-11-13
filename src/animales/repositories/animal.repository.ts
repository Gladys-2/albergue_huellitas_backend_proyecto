import Animal from "../entities/animal.entity";
import Refugio from "../../refugios/entities/refugio.entity";

export class AnimalRepository {
  async findAll() {
    return await Animal.findAll({ include: [Refugio] });
  }

  async findById(id: number) {
    return await Animal.findByPk(id, { include: [Refugio] });
  }

  async create(data: any) {
    return await Animal.create(data);
  }
}