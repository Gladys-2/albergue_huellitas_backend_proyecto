import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity("administradores")
export class Administrador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  privilegios?: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "usuario_id" })
  usuario?: Usuario;
}