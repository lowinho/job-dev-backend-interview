import { Router } from 'express';
import { PhotoProductController } from "../controller/PhotoProductController";
import multer from "multer";
import multerConfig from "../config/productMulterConfig";
const upload = multer(multerConfig).single("file");

const photoProductRoutes = Router();
const photoProductController = new PhotoProductController();

// photoProductRoutes.get("/", photoProductController.index);
photoProductRoutes.get("/:id", photoProductController.show);
photoProductRoutes.post("/:id", upload,  photoProductController.store);
// photoProductRoutes.put("/:id", photoProductController.update);

export { photoProductRoutes };
