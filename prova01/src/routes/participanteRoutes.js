import { Router } from "express";
import { registerParticipante } from "../controllers/participanteController.js";

const router = Router();

router.post("/participante/registrar", registerParticipante);

export default router;