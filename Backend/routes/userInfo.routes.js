import express from "express";
import { getUserInfo,updateUserInfo } from "../controller/userInfo.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/",verifyToken, getUserInfo);

// Route to update user info
router.put("/",verifyToken, updateUserInfo);

export default router;