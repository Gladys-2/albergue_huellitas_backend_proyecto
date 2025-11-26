import { AppDataSource } from "../../config/db";
import { Animal } from "../entities/animal.entity";

export class AnimalService {
  private animalRepository = AppDataSource.getRepository(Animal);

  async listarAnimales(): Promise<Animal[]> {
    return await this.animalRepository.find();
  }

  async obtenerAnimal(id: number): Promise<Animal | null> {
    return await this.animalRepository.findOneBy({ id });
  }

  async crearAnimal(data: Partial<Animal>): Promise<Animal> {
    const nuevoAnimal = this.animalRepository.create(data);
    return await this.animalRepository.save(nuevoAnimal);
  }

  async actualizarAnimal(id: number, data: Partial<Animal>): Promise<Animal | null> {
    const animal = await this.animalRepository.findOneBy({ id });
    if (!animal) return null;
    this.animalRepository.merge(animal, data);
    return await this.animalRepository.save(animal);
  }

  async toggleEstadoAnimal(id: number): Promise<Animal | null> {
    const animal = await this.animalRepository.findOneBy({ id });
    if (!animal) return null;
    animal.estado = animal.estado === "Activo" ? "Inactivo" : "Activo";
    return await this.animalRepository.save(animal);
  }
}