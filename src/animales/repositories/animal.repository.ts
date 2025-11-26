import { AppDataSource } from "../../config/db";
import { Animal } from "../entities/animal.entity";
import { Repository } from "typeorm";

export class AnimalRepository {
  private repo: Repository<Animal>;

  constructor() {
    this.repo = AppDataSource.getRepository(Animal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.repo.find({ relations: ["refugio"] });
  }

  async findById(id: number): Promise<Animal | null> {
    return await this.repo.findOne({ where: { id }, relations: ["refugio"] });
  }

  async create(data: Partial<Animal>): Promise<Animal> {
    const animal = this.repo.create(data);
    return await this.repo.save(animal);
  }

  async update(id: number, data: Partial<Animal>): Promise<Animal> {
    await this.repo.update(id, data);
    const actualizado = await this.repo.findOne({ where: { id }, relations: ["refugio"] });
    if (!actualizado) throw new Error("Animal no encontrado después de actualizar");
    return actualizado;
  }
}