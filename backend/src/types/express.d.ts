import { FileArray } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      files?: FileArray; // Adjust type based on middleware used
    }
  }
}
