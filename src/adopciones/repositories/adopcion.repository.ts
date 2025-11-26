import { AppDataSource } from "../../config/db"
import { Adopcion } from "../entities/adopcion.entity";

export class AdopcionRepository {
  private repo = AppDataSource.getRepository(Adopcion);

  async findAll() {
    return await this.repo.find({
      relations: ["usuario", "animal"]
    });
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["usuario", "animal"]
    });
  }

  async create(data: any) {
    const nuevaAdopcion = this.repo.create({
      usuario: { id: data.usuarioId },
      animal: { id: data.animalId },
      fecha: new Date(),
      estado: "pendiente"
    });

    return await this.repo.save(nuevaAdopcion);
  }

  async findByUsuario(usuarioId: number) {
    return await this.repo.find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario", "animal"]
    });
  }
}