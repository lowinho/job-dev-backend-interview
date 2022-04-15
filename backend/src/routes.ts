import { Router } from "express";

import { productRoutes } from "./routes/productRoutes";
import { restaurantRoutes } from "./routes/restaurantRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { scheduleRoutes } from "./routes/scheduleRoutes";
import { photoProductRoutes } from "./routes/photoProductRoutes";
import { photoRestaurantRoutes } from "./routes/photoRestaurantRoutes";

const routes = Router();

routes.use('/product', productRoutes);
routes.use('/restaurant', restaurantRoutes);
routes.use('/sale', saleRoutes);
routes.use('/schedule', scheduleRoutes);
routes.use('/photo-restaurant', photoRestaurantRoutes);
routes.use('/photo-product', photoProductRoutes);

export { routes };