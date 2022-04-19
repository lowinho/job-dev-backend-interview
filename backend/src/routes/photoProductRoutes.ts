import { Router } from 'express';
import { PhotoProductController } from "../controller/PhotoProductController";
import multer from "multer";
import multerConfig from "../config/productMulterConfig";
const upload = multer(multerConfig).single("file");

const photoProductRoutes = Router();
const photoProductController = new PhotoProductController();

photoProductRoutes.get("/:id", photoProductController.show);
photoProductRoutes.get("/:id", photoProductController.getByProduct);
photoProductRoutes.post("/:id", upload,  photoProductController.store);
photoProductRoutes.delete("/:id", photoProductController.delete);

export { photoProductRoutes };
