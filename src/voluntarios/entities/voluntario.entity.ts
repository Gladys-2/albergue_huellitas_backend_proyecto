import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Refugio } from "../../refugios/entities/refugio.entity";

@Entity("voluntarios")
export class Voluntario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: "Sin nombre" })
  nombre?: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  correo?: string;

  @ManyToOne(() => Refugio, { nullable: true })
  @JoinColumn({ name: "refugio_id" })
  refugio?: Refugio;
}