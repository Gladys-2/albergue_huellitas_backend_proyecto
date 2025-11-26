import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Animal } from "../../animales/entities/animal.entity";

@Entity("refugios")
export class Refugio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nombre!: string;

  @Column("text")
  direccion!: string;

  @Column({ length: 50, nullable: true })
  telefono?: string;

  @Column({ length: 150, nullable: true })
  correo?: string;

  @Column({ length: 20, default: "Activo" })
  estado?: string;

  @CreateDateColumn({ name: "fecha_creacion" })
  fecha_creacion?: Date;

  @Column({ nullable: true })
  usuario_creacion?: string;

  @UpdateDateColumn({ name: "fecha_modificacion" })
  fecha_modificacion?: Date;

  @Column({ nullable: true })
  usuario_modificacion?: string;

  @OneToMany(() => Animal, (animal) => animal.refugio)
  animales!: Animal[];
}