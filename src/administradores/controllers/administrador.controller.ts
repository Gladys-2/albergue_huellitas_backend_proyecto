import { Request, Response } from "express";
import Administrador from "../entities/administrador.entity";
import Usuario from "../../usuarios/entities/usuario.entity";

export const getAdministradores = async (req: Request, res: Response) => {
  try {
    const admins = await Administrador.findAll({
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido_paterno", "apellido_materno", "correo_electronico", "rol"]
        }
      ]
    });
    res.json(admins);
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    res.status(500).json({
      message: "Error al obtener administradores",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const crearAdministrador = async (req: Request, res: Response) => {
  try {
    const { usuario_id, privilegios } = req.body;

    
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const admin = await Administrador.create({ usuario_id, privilegios });
    res.status(201).json(admin);
  } catch (error) {
    console.error("Error al crear administrador:", error);
    res.status(500).json({
      message: "Error al crear administrador",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const actualizarAdministrador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { privilegios } = req.body;

    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    await admin.update({ privilegios });
    res.json(admin);
  } catch (error) {
    console.error("Error al actualizar administrador:", error);
    res.status(500).json({
      message: "Error al actualizar administrador",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const eliminarAdministrador = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    await admin.destroy();
    res.json({ message: "Administrador eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar administrador:", error);
    res.status(500).json({
      message: "Error al eliminar administrador",
      error: error instanceof Error ? error.message : error
    });
  }
};