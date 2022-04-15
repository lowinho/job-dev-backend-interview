import { Request, Response } from "express";
import { ProductService } from '../services/ProductService';

class ProductController {

    async index(req: Request, res: Response) {
        const productService = new ProductService();
        try {
            const product = await productService.index();
            return res.json(product)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const productService = new ProductService();
        const { id } = req.params;
        try {
            const product = await productService.show(parseInt(id));
            return res.json(product)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { 
            idRestaurant, 
            name, 
            price, 
            category, 
            isSale  
        } = req.body;
        const productService = new ProductService();
        try {
            const product = await productService.store({ 
                idRestaurant, 
                name, 
                price, 
                category, 
                isSale   });
            return res.json(product)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const productService = new ProductService();
        try {
            const product = await productService.update(parseInt(id), data);
    
            return res.json(product)
            
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const productService = new ProductService();
        try {
            const restaurant = await productService.delete(parseInt(id));
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { ProductController };