import { Request, Response } from "express";
import { ScheduleService } from '../services/ScheduleService';

class ScheduleController {

    async index(req: Request, res: Response) {
        const scheduleService = new ScheduleService();
        try {
            const schedule = await scheduleService.index();
            return res.json(schedule)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async show(req: Request, res: Response) {
        const scheduleService = new ScheduleService();
        const { id } = req.params;
        try {
            const schedule = await scheduleService.show(parseInt(id));
            return res.json(schedule)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { 
            idRestaurant,
            idSale, 
            dayWeek, 
            initialTime, 
            endTime
        } = req.body;
        const scheduleService = new ScheduleService();
        try {
            const schedule = await scheduleService.store({ 
                idRestaurant,
                idSale, 
                dayWeek, 
                initialTime, 
                endTime });
            return res.json(schedule)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const scheduleService = new ScheduleService();
        try {
            const schedule = await scheduleService.update(parseInt(id), data);
    
            return res.json(schedule)
            
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const scheduleService = new ScheduleService();
        try {
            const restaurant = await scheduleService.delete(parseInt(id));
            return res.json(restaurant)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async getByRestaurant(req: Request, res: Response) {
        const { id } = req.params;
        const scheduleService = new ScheduleService();
        try {
            const music = await scheduleService.getByRestaurant(parseInt(id));
            return res.json(music)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async getBySale(req: Request, res: Response) {
        const { id } = req.params;
        const scheduleService = new ScheduleService();
        try {
            const music = await scheduleService.getBySale(parseInt(id));
            return res.json(music)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }
}

export { ScheduleController };