import { Request, Response } from "express";
import { RestaurantService } from '../services/RestaurantService';

class RestaurantController {

    async index(req: Request, res: Response) {
        
        const restaurantService = new RestaurantService();
        try {
            const restaurant = await restaurantService.index();
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const restaurantService = new RestaurantService();
        try {
            const restaurant = await restaurantService.show(parseInt(id));
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { 
            name, 
            street,
            number,
            district,
            city,
            state  
        } = req.body;
        const restaurantService = new RestaurantService();
        try {
            const restaurant = await restaurantService.store({ 
                name, 
                street,
                number,
                district,
                city,
                state  
            });
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const restaurantService = new RestaurantService();
        try {
            const restaurant = await restaurantService.update(parseInt(id), data);
    
            return res.json(restaurant)
            
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const restaurantService = new RestaurantService();
        try {
            const restaurant = await restaurantService.delete(parseInt(id));
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { RestaurantController };