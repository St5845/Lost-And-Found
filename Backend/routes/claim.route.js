import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { submitClaim,getClaimById,getClaimById } from "../controller/claim.controller";

const router = express.Router();


router.post("/", upload.single("identityCard"), submitClaim);
router.get("/item/:itemId", getClaimsById);
router.get("/:id", getClaimById);

export default router;
