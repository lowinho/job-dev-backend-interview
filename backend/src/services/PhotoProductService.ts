import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import appConfig from '../config/appConfig';
import { IPhotoProduct } from '../models';

const prisma = new PrismaClient()

class PhotoProductService {
  async show(id: number) {
    const photo = await prisma.$queryRawUnsafe(
        `SELECT * FROM "PhotoProduct" WHERE (id = ${id})`
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
      const url = `${appConfig.url}/images/product/${params.filename}`;
      const idProduct = id;
  
      await prisma.$queryRaw`
        INSERT INTO "PhotoProduct" (
                filename, 
                originalname,
                url,
                id_product) 
        VALUES (${fileName}, 
                ${originalName}, 
                ${url}, 
                ${idProduct});
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
      productId: Yup.number().required(),
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
      const url = `${appConfig.url}/images/product/${params.filename}`;
      const productId = params.id;
  
      const photo = await prisma.$executeRaw`
        UPDATE "PhotoProduct" SET
        id_product = ${productId}, 
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

  async getByProduct(id: number) {
    const photo = await prisma.$queryRawUnsafe(
      `SELECT * FROM "PhotoProduct" WHERE (id_product = ${id})`
  )
    return photo; 
  }

  async delete(id: number) {
    const restaurant = await prisma.$queryRawUnsafe(
        `DELETE FROM "PhotoProduct" WHERE (id = ${id})`
    )
      return restaurant; 
  }
}

export { PhotoProductService };