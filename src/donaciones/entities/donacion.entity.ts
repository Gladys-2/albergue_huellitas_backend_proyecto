import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity("donaciones")
export class Donacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario?: Usuario;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  monto?: number;

  @Column({ nullable: true })
  tipo?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date;
}
