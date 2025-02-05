import multer from "multer";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, "uploads/"); // Path to save uploaded files
  },
  filename: (_req, file, cb) => {
    // Generate a unique name for each file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only specific file types (optional)
const fileFilter = (_req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
  }
};

// Initialize the Multer instance
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max file size (2MB)
  fileFilter,
});
