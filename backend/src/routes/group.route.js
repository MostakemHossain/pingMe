import express from "express";

import { auth } from "../middleware/auth.middleware.js";
import { createGroup, getAllGroups, getGroupMessages, sendGroupMessage } from "../controllers/group.controller.js";


const router = express.Router();

router.use(auth);
router.post("/create", createGroup);
router.get("/get", getAllGroups);
router.post("/message-sent", sendGroupMessage);
router.get("/message-get/:groupId", getGroupMessages);



export default router;
