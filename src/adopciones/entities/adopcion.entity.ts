import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Animal } from "../../animales/entities/animal.entity";

@Entity("adopciones")
export class Adopcion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { nullable: false })
  usuario!: Usuario;

  @ManyToOne(() => Animal, { nullable: false })
  animal!: Animal;

  @CreateDateColumn()
  fecha!: Date;

  @Column({ nullable: true })
  estado?: string;
}