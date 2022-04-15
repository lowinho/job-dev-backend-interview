import { Request, Response } from "express";
import { SaleService } from '../services/SaleService';

class SaleController {

    async index(req: Request, res: Response) {
        const saleService = new SaleService();
        try {
            const sale = await saleService.index();
            return res.json(sale)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const saleService = new SaleService();
        const { id } = req.params;
        try {
            const sale = await saleService.show(parseInt(id));
            return res.json(sale)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { 
            idProduct, 
            description, 
            price
        } = req.body;
        const saleService = new SaleService();
        try {
            const sale = await saleService.store({ 
                idProduct, 
                description, 
                price});
            return res.json(sale)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const saleService = new SaleService();
        try {
            const sale = await saleService.update(parseInt(id), data);
    
            return res.json(sale)
            
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const saleService = new SaleService();
        try {
            const restaurant = await saleService.delete(parseInt(id));
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { SaleController };