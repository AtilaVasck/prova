import { Router } from "express";
import { registerPalestrante, checkPalestrante } from "../controllers/palestranteController.js";

const router = Router();

router.post("/registerPalestrantes", registerPalestrante);
router.get("/checkPalestrantes", checkPalestrante);

export default router;