import { Usuario } from "../../usuarios/entities/usuario.entity";
import { AppDataSource } from "../../config/db";
import { Repository } from "typeorm";

export class UserRepository {
  private repo: Repository<Usuario>;
  findOne: any;
  save: any;

  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.repo.find({
      select: ["id","nombre","apellido_paterno","apellido_materno","correo_electronico","rol","genero","estado"],
    });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.repo.findOne({
      where: { id },
      select: ["id","nombre","apellido_paterno","apellido_materno","correo_electronico","rol","genero","estado"],
    });
  }

  async findByEmail(correo_electronico: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { correo_electronico } });
  }

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, data);
    return this.repo.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
export const userRepository = new UserRepository();