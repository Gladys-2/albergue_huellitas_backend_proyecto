import { AnimalRepository } from "../repositories/animal.repository";

const repo = new AnimalRepository();

export class AnimalService {
  async listarAnimales() {
    return await repo.findAll();
  }

  async obtenerAnimal(id: number) {
    return await repo.findById(id);
  }

  async crearAnimal(data: any) {
    return await repo.create(data);
  }
}