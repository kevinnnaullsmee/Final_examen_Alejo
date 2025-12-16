import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";
import { roomSchema } from "../schemas/room.schema";

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rooms]: any = await pool.query("SELECT * FROM rooms");
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [[room]]: any = await pool.query("SELECT * FROM rooms WHERE id = ?", [Number(id)]);
    if (!room) return res.status(404).json({ message: "Sala no encontrada" });
    res.json(room);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, capacity } = roomSchema.parse(req.body);
    const [existing]: any = await pool.query("SELECT id FROM rooms WHERE name = ?", [name]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Ya hay una sala con ese nombre" });
    }
    const [result]: any = await pool.query("INSERT INTO rooms (name, capacity) VALUES (?, ?)", [name, capacity]);
    res.status(201).json({ message: "Sala creada correctamente", id: result.insertId });
  } catch (error: any) {
    next(error);
  }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, capacity } = roomSchema.parse(req.body);
    const [existing]: any = await pool.query("SELECT id FROM rooms WHERE name = ? AND id != ?", [name, Number(id)]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Ya existe otra sala con ese nombre" });
    }
    const [result]: any = await pool.query("UPDATE rooms SET name = ?, capacity = ? WHERE id = ?", [name, capacity, Number(id)]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Sala no encontrada" });
    res.json({ message: "Sala actualizada" });
  } catch (error: any) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query("DELETE FROM rooms WHERE id = ?", [Number(id)]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Sala no encontrada" });
    res.json({ message: "Sala eliminada" });
  } catch (error) {
    next(error);
  }
};

