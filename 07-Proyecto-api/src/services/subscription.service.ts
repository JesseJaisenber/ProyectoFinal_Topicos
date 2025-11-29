import { prisma } from "../db/client";
import type { Subscription } from "../interfaces/subscription.interface";
import { randomUUID as uuid } from "node:crypto";

export const getAll = async (): Promise<Subscription[]> => {
  const subs = await prisma.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return subs.map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price,
    currency: s.currency as Subscription["currency"],
    frequency: s.frequency as Subscription["frequency"],
    nextPaymentDate: s.nextPaymentDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
  }));
};

export const findById = async (id: string): Promise<Subscription | null> => {
  const s = await prisma.subscription.findUnique({ where: { id } });
  if (!s) return null;

  return {
    id: s.id,
    name: s.name,
    price: s.price,
    currency: s.currency as Subscription["currency"],
    frequency: s.frequency as Subscription["frequency"],
    nextPaymentDate: s.nextPaymentDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
  };
};

export const create = async (
  payload: Partial<Subscription>
): Promise<Subscription> => {
  const id = uuid();

  const created = await prisma.subscription.create({
    data: {
      id,
      name: payload.name!,
      price: payload.price!,
      currency: payload.currency!,
      frequency: payload.frequency!,
      nextPaymentDate: new Date(payload.nextPaymentDate!),
    },
  });

  return {
    id: created.id,
    name: created.name,
    price: created.price,
    currency: created.currency as Subscription["currency"],
    frequency: created.frequency as Subscription["frequency"],
    nextPaymentDate: created.nextPaymentDate.toISOString(),
    createdAt: created.createdAt.toISOString(),
  };
};

export const update = async (
  id: string,
  payload: Partial<Subscription>
): Promise<Subscription | null> => {
  const existing = await prisma.subscription.findUnique({ where: { id } });
  if (!existing) return null;

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      name: payload.name ?? existing.name,
      price: payload.price ?? existing.price,
      currency: payload.currency ?? (existing.currency as Subscription["currency"]),
      frequency:
        payload.frequency ?? (existing.frequency as Subscription["frequency"]),
      nextPaymentDate: payload.nextPaymentDate
        ? new Date(payload.nextPaymentDate)
        : existing.nextPaymentDate,
    },
  });

  return {
    id: updated.id,
    name: updated.name,
    price: updated.price,
    currency: updated.currency as Subscription["currency"],
    frequency: updated.frequency as Subscription["frequency"],
    nextPaymentDate: updated.nextPaymentDate.toISOString(),
    createdAt: updated.createdAt.toISOString(),
  };
};

export const remove = async (id: string): Promise<void> => {
  await prisma.subscription.delete({ where: { id } });
};


