import { AdopcionRepository } from "../repositories/adopcion.repository";

const repo = new AdopcionRepository();

export class AdopcionService {
  async listarAdopciones() {
    return await repo.findAll();
  }

  async listarAdopcionesPorUsuario(usuarioId: number) {
    return await repo.findByUsuario(usuarioId);
  }

  async crearAdopcion(data: any) {
    return await repo.create(data);
  }
}