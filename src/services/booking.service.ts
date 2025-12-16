import {pool} from "../config/db"

export const getAllBookings = async ()=>{
    const [rows] = await pool.query("SELECT * FROM  bookings ");
    return rows;
};

export const getBookingById = async (id:number)=>{
    const [[booking]]: any = await pool.query("SELECT * FROM bookings WHERE id = ?",[id]);
    return booking;
};

export const getBookingByRoomId = async (roomId: number) => {
  const [rows]: any = await pool.query(`
    SELECT 
      b.id,
      b.user_id,
      u.name AS user_name,
      b.room_id,
      r.name AS room_name,
      b.date,
      b.start_time,
      b.end_time
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN users u ON b.user_id = u.id
    WHERE b.room_id = ?
  `, [roomId]);

  return rows;
};


export const createBooking = async(userId: number,roomId: number,date: string,startTime: string,endTime: string)=>{
    const [result]: any = await pool.query(`INSERT INTO bookings (user_id, room_id, date, start_time, end_time)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, roomId, date, startTime, endTime]
    );
    return result.insertId; //devuelve el id de la reserva creada
};

export const deleteBooking = async (id:number)=>{
    const [result]: any = await pool.query(
        "DELETE FROM bookings WHERE id= ?",
        [id]
    );
    return result.affectedRows; // 0 si no se eliminó, 1 si se eliminó
}