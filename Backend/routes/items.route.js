import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  getAllItems,
  createItem,
  getUserItems,
  updateStatus
} from "../controller/items.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";




const router = express.Router();

// Define routes and link to controller functions
router.get("/", getAllItems); // Get all items
router.post("/",verifyToken, upload.single("image"),createItem); // Add a new item
router.get("/user-items", verifyToken,getUserItems); // Get item by ID
// router.delete("/:id", deleteItemById); // Delete item by ID
router.put("/:id",verifyToken,updateStatus);

export default router; // Export the routes