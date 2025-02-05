import express from "express"
import { sendMessage,getMessage } from "../controller/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:itemId/:userToChatId",verifyToken,getMessage);
router.post("/send/:id",verifyToken,sendMessage);

export default router;