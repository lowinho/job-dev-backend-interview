import { Router } from 'express';
import { RestaurantController } from "../controller/RestaurantController";

const restaurantRoutes = Router();
const restaurantController = new RestaurantController();

restaurantRoutes.get("/", restaurantController.index);
restaurantRoutes.get("/:id", restaurantController.show);
restaurantRoutes.post("/", restaurantController.store);
restaurantRoutes.put("/:id", restaurantController.update);
restaurantRoutes.delete("/:id", restaurantController.delete);

export { restaurantRoutes };
