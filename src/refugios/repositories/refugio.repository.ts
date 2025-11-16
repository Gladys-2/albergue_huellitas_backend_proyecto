import { AppDataSource } from "../../config/db";
import { Refugio } from "../entities/refugio.entity";

export class RefugioRepository {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(Refugio);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
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
