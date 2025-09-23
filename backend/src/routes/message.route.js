import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcject.middleware.js";

const router = express.Router();

router.use(arcjetProtection,auth);
router.get("/contacts", getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
