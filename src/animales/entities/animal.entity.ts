import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Refugio } from "../../refugios/entities/refugio.entity";

@Entity("animales")
export class Animal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: "Sin nombre" })
  nombre?: string;

  @Column({ nullable: true })
  especie?: string;

  @Column({ nullable: true })
  raza?: string;

  @Column({ nullable: true })
  sexo?: string;

  @Column({ nullable: true, type: "int" })
  edad?: number;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true, default: "Disponible" })
  estado_animal?: "Disponible" | "Adoptado" | "En cuidado";

  @Column({ nullable: true, default: "Activo" })
  estado?: "Activo" | "Inactivo";

  @Column({ nullable: true })
  foto?: string;

  @Column({ type: "int", nullable: true })
  refugio_id?: number;

  @ManyToOne(() => Refugio)
  @JoinColumn({ name: "refugio_id" })
  refugio?: Refugio;

  @Column({ nullable: true })
  fecha_creacion?: string;

  @Column({ nullable: true })
  fecha_modificacion?: string;
}