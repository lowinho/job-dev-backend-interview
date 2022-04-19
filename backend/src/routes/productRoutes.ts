import { Router } from 'express';
import { ProductController } from "../controller/ProductController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", productController.index);
productRoutes.get("/:id", productController.show);
productRoutes.post("/", productController.store);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.delete);

export { productRoutes };
