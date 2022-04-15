import { Router } from 'express';
import { PhotoRestaurantController } from "../controller/PhotoRestaurantController";
import multer from "multer";
import multerConfig from "../config/productMulterConfig";
const upload = multer(multerConfig).single("file");

const photoRestaurantRoutes = Router();
const photoRestaurantController = new PhotoRestaurantController();

// photoRestaurantRoutes.get("/", photoRestaurantController.index);
photoRestaurantRoutes.get("/:id", photoRestaurantController.show);
photoRestaurantRoutes.post("/:id", upload, photoRestaurantController.store);
// photoRestaurantRoutes.put("/:id", photoRestaurantController.update);

export { photoRestaurantRoutes };
