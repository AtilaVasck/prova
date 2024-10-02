import { Router } from "express";
import {inscriberEvent, criarEvent } from "../controllers/eventController.js";

const router = Router();

//helpers
import verifyToken from "../helpers/verify-token.js";

router.post("/criar", verifyToken, criarEvent);
router.post("/inscrever", inscriberEvent);

export default router;