import { DonacionRepository } from "../repositories/donacion.repository";

const repo = new DonacionRepository();

export class DonacionService {
  async listarDonaciones() {
    return await repo.findAll();
  }

  async obtenerDonacion(id: number) {
    return await repo.findById(id);
  }

  async crearDonacion(data: any) {
    return await repo.create(data);
  }

  async actualizarDonacion(id: number, data: any) {
    return await repo.update(id, data);
  }

  async eliminarDonacion(id: number) {
    return await repo.delete(id);
  }
}