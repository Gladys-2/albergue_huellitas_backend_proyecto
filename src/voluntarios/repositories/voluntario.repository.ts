import { AppDataSource } from "../../config/db";
import { Voluntario } from "../entities/voluntario.entity";

export class VoluntarioRepository {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(Voluntario);
  }

  findAll() {
    // Incluye relación con refugio si existe
    return this.repo.find({ relations: ["refugio"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["refugio"] });
  }

  create(data: any) {
    const nuevo = this.repo.create(data);
    return this.repo.save(nuevo);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}