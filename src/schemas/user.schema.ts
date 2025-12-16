import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "el nombre debe tener minimo 2 caracteres"),

  email: z
    .string()
    .email("formato de email invalido"),
});
