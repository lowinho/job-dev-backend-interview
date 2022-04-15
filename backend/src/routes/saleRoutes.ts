import { Router } from 'express';
import { SaleController } from "../controller/SaleController";

const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get("/", saleController.index);
saleRoutes.get("/:id", saleController.show);
saleRoutes.post("/", saleController.store);
saleRoutes.put("/:id", saleController.update);

export { saleRoutes };
