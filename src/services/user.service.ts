import { pool } from "../config/db";

export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

export const getUserById = async (id: number) => {
  const [[user]]: any = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  return user; 
};

export const createUser = async (name: string, email: string) => {
  const [result]: any = await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return result.insertId; 
};

export const updateUser = async (id: number, name: string, email: string) => {
  const [result]: any = await pool.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id]
  );
  return result.affectedRows; 
};

export const deleteUser = async (id: number) => {
  const [result]: any = await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  return result.affectedRows; 
};
