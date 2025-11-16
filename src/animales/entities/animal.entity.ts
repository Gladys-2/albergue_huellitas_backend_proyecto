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
  estado?: string;

  @Column({ nullable: true })
  foto?: string;

  @ManyToOne(() => Refugio, { nullable: true })
  @JoinColumn({ name: "refugio_id" })
  refugio?: Refugio;
}