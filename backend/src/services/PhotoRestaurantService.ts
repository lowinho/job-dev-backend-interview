import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
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
  
      const photo = await prisma.$queryRaw`
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

  async update(id: number, params: any) {
    const schema = Yup.object().shape({
      idRestaurant: Yup.number().required(),
      fileName: Yup.string().required(),
      originalName: Yup.string().required(),
      url: Yup.string().required()
    });

    if (!(await schema.isValid(params))) {
        throw new CustomError({
          code: 'VALIDATION_FAILS',
          message: 'Validation fails',
          status: 400,
        });
    }

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
      const idRestaurant = params.id;
  
      const photo = await prisma.$executeRaw`
        UPDATE "PhotoRestaurant" SET
        id_restaurant = ${idRestaurant}, 
        filename = ${fileName},
        originalname = ${originalName},
        url = ${url} WHERE id = ${id};
        `
        return photo;
    } catch (e: any) {
      throw new CustomError({
          code: 'ERROR_SAVE_IMAGE',
          message: e,
          status: 400,
        });
    }
  }

  async getByUser(id: number) {
    const photo = await prisma.$queryRawUnsafe(
      `SELECT * FROM "PhotoRestaurant" WHERE (id_restaurant = ${id})`
  )
  
    return photo; 
  }
}

export { PhotoRestaurantService };