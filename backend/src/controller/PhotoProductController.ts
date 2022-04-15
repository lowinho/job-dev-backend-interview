import { Request, Response } from "express";
import { PhotoProductService } from '../services/PhotoProductService';

class PhotoProductController {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const photoService = new PhotoProductService();
        try {
            const photo = await photoService.show(parseInt(id));
            return res.json(photo)
        } catch (err: any) {
            return res.status(400).json({
                message: err.message,
            })
        }
    }

    async store(req: Request, res: Response) {
        const { id } = req.params;
        const params = req.file;
        const photoService = new PhotoProductService();
        try { 
          const file = await photoService.store(parseInt(id), params);
          return res.json(file);
        } catch (err: any) {
          res.status(400).json({ 
            message: err.message 
          });
        }
    }

    async getByUser(req: Request, res: Response) {
      const { id } = req.params;
      const musicService = new PhotoProductService();
      try {
          const music = await musicService.getByUser(parseInt(id));
          return res.json(music)
      } catch (err: any) {
          return res.status(400).json({
              message: err.message,
          })
      }
  }
}

export { PhotoProductController };