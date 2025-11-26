import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("donaciones")
export class Donacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  nombreDonante?: string;

  @Column({ type: "numeric", nullable: true })
  monto?: number;

  @Column({ nullable: true })
  tipo?: string;

  @Column({ type: "date", nullable: true })
  fecha?: string;

  @Column({ nullable: true })
  metodoPago?: string;
}