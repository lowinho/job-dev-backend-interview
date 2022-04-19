import { PrismaClient } from '@prisma/client';
import { CustomError } from 'express-handler-errors';
import appConfig from '../config/appConfig';

const prisma = new PrismaClient()

interface IPhotoRestaurant {
  id?: number;
  idRestaurant: number;
  filename?: string;
  originalname?: string;
  destination?: string;
}

class PhotoRestaurantService {
  async show(id: number) {
    const photo = await prisma.$queryRawUnsafe(
        `SELECT * FROM "PhotoRestaurant" WHERE (id = ${id})`
    )
      return photo; 
}

  async store(id: number, params: any) {
    if (!params.filename) {
      throw new CustomError({
        code: 'FILE_NOT_FOUND',
        message: 'File not found',
        status: 400,
      });
    }

    try {
      const fileName = params.filename;
      const originalName = params.originalname;
      const url = `${appConfig.url}/images/restaurant/${params.filename}`;
      const idRestaurant = id;
      console.log(fileName, originalName, url, idRestaurant);
  
      await prisma.$queryRaw`
        INSERT INTO "PhotoRestaurant" (
                filename, 
                originalname,
                url,
                id_restaurant) 
        VALUES (${fileName}, 
                ${originalName}, 
                ${url}, 
                ${idRestaurant});
        `
      return "Successful Register";  
    } catch (e: any) {
      throw new CustomError({
          code: 'ERROR_SAVE_IMAGE',
          message: e,
          status: 400,
        });
    }
    
  }

  async getByRestaurant(id: number) {
    const photo = await prisma.$queryRawUnsafe(
      `SELECT * FROM "PhotoRestaurant" WHERE (id_restaurant = ${id})`
  )
  
    return photo; 
  }

  async delete(id: number) {
    const restaurant = await prisma.$queryRawUnsafe(
        `DELETE FROM "PhotoRestaurant" WHERE (id = ${id})`
    )
      return restaurant; 
  }
}

export { PhotoRestaurantService };