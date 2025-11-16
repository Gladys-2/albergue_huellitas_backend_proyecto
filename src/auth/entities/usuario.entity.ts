import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido_paterno!: string;

  @Column()
  apellido_materno!: string;

  @Column({ unique: true })
  correo_electronico!: string;

  @Column()
  contrasena!: string;

  @Column({ type: "varchar", default: "usuario" })
  rol!: "usuario" | "administrador";

  @Column({ type: "varchar", default: "Activo" })
  estado!: "Activo" | "Inactivo";

  @Column({ type: "varchar", nullable: true })
  avatarUrl?: string; 
}