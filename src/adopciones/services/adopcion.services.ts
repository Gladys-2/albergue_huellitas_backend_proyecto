import { AdopcionRepository } from "../repositories/adopcion.repository";

const repo = new AdopcionRepository();

export class AdopcionService {
  async listarAdopciones() {
    return await repo.findAll();
  }

  async obtenerAdopcion(id: number) {
    return await repo.findById(id);
  }

  async crearAdopcion(data: any) {

    return await repo.create(data);
  }
}