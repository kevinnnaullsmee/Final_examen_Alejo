import { z } from "zod";

export const roomSchema = z.object({
  name: z
    .string()
    .min(2, " el nombre del Room debe tener minimo 2 caracteres"),

  capacity: z
    .number()
    .int()
    .positive("La capacidad debe ser mayor que 0"),
});
