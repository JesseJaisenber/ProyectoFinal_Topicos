import { Router } from "express";
import {
  getAll,
  findById,
  create,
  update,
  remove,
} from "../controllers/subscription.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;


