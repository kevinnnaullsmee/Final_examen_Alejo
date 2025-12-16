import { Request, Response, NextFunction } from "express";
import * as bookingService from "../services/booking.service";

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(Number(id));
    if (!booking) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingsByRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const bookings = await bookingService.getBookingByRoomId(Number(id));
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, roomId, date, startTime, endTime } = req.body;
    const id = await bookingService.createBooking(userId, roomId, date, startTime, endTime);
    res.status(201).json({ message: "Reserva creada", id });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const affected = await bookingService.deleteBooking(Number(id));
    if (affected === 0) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    next(error);
  }
};

