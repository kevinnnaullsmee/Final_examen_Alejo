import { pool } from "../config/db";

export const getAllRooms = async () => {
  const [rows] = await pool.query("SELECT * FROM rooms");
  return rows;
};

export const getRoomById = async (id: number) => {
  const [[room]]: any = await pool.query(
    "SELECT * FROM rooms WHERE id = ?",
    [id]
  );
  return room; 
};

export const createRoom = async (name: string, capacity: number) => {
  const [result]: any = await pool.query(
    "INSERT INTO rooms (name, capacity) VALUES (?, ?)",
    [name, capacity]
  );
  return result.insertId; 
};

export const updateRoom = async (id: number, name: string, capacity: number) => {
  const [result]: any = await pool.query(
    "UPDATE rooms SET name = ?, capacity = ? WHERE id = ?",
    [name, capacity, id]
  );
  return result.affectedRows; 
};

export const deleteRoom = async (id: number) => {
  const [result]: any = await pool.query(
    "DELETE FROM rooms WHERE id = ?",
    [id]
  );
  return result.affectedRows; 
};
