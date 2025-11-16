import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("refugios")
export class Refugio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: "Sin nombre" })
  nombre?: string;

  @Column({ nullable: true })
  direccion?: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  correo?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha_actualizacion!: Date;
}