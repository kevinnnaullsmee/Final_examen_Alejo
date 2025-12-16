import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes";
import roomRoutes from "./routes/rooms.routes";
import bookingRoutes from "./routes/bookings.routes";

dotenv.config();

const app = express();


app.use(express.json());

app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));