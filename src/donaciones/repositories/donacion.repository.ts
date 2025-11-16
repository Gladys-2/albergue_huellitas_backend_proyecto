import { AppDataSource } from "../../config/db";
import { Donacion } from "../entities/donacion.entity";

export class DonacionRepository {
  private repo;

  constructor() {
    this.repo = AppDataSource.getRepository(Donacion);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: any) {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}