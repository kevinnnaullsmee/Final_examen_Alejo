import { Router } from "express";
import { getBookings,getBookingById,getBookingsByRoom,createBooking,deleteBooking} from "../controllers/bookings.controller";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", getBookings);

router.get("/:id", getBookingById);

router.get("/room/:id", getBookingsByRoom);

router.post("/", createBooking);

router.delete("/:id", deleteBooking);

export default router;
