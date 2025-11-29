import type { NextFunction, Request, Response } from "express";
import * as SubscriptionService from "../services/subscription.service";
import {
  validateSubscription,
  validateSubscriptionPartial,
} from "../schemas/subscription.schema";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subs = await SubscriptionService.getAll();
    res.json(subs);
  } catch (error) {
    next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const sub = await SubscriptionService.findById(id);

    if (!sub) {
      return res.status(404).json({ message: `Suscripción con id ${id} no encontrada` });
    }

    res.json(sub);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validateSubscription(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    const created = await SubscriptionService.create(result.data);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = validateSubscriptionPartial(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    const updated = await SubscriptionService.update(id, result.data);

    if (!updated) {
      return res.status(404).json({ message: "La suscripción no existe" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await SubscriptionService.findById(id);

    if (!existing) {
      return res.status(404).json({ message: "La suscripción no existe" });
    }

    await SubscriptionService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


