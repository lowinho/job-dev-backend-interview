import { Router } from 'express';
import { PhotoRestaurantController } from "../controller/PhotoRestaurantController";
import multer from "multer";
import multerConfig from "../config/restaurantMulterConfig";
const upload = multer(multerConfig).single("file");

const photoRestaurantRoutes = Router();
const photoRestaurantController = new PhotoRestaurantController();

photoRestaurantRoutes.get("/:id", photoRestaurantController.show);
photoRestaurantRoutes.get("/:id", photoRestaurantController.getByRestaurant);
photoRestaurantRoutes.post("/:id", upload, photoRestaurantController.store);
photoRestaurantRoutes.delete("/:id", photoRestaurantController.delete);

export { photoRestaurantRoutes };
