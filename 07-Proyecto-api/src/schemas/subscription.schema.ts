import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().nonnegative("El precio debe ser positivo"),
  currency: z.enum(["USD", "HNL"]),
  frequency: z.enum(["monthly", "annual"]),
  nextPaymentDate: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Fecha inválida",
    }),
});

export const subscriptionPartialSchema = subscriptionSchema.partial();

export const validateSubscription = (data: unknown) =>
  subscriptionSchema.safeParse(data);

export const validateSubscriptionPartial = (data: unknown) =>
  subscriptionPartialSchema.safeParse(data);


