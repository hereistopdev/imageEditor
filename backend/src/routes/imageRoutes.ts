import express from "express";
import { uploadImage, processImage } from "../controllers/imageController";

const router = express.Router();

router.post("/upload", uploadImage);
router.post("/process", processImage);

export default router;
