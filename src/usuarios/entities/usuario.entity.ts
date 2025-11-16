import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("usuarios")
export class Usuario {
  password(password: string, password1: any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: "Sin nombre" })
  nombre?: string;

  @Column({ nullable: true, default: "Sin apellido" })
  apellido_paterno?: string;

  @Column({ nullable: true })
  apellido_materno?: string;

  @Column({ unique: true, nullable: true })
  correo_electronico?: string;

  @Column({ nullable: true })
  contrasena?: string; 

  @Column({ default: "usuario" })
  rol!: string;

  @Column({ nullable: true })
  genero?: string;

  @Column({ default: "Activo" })
  estado!: string;
}