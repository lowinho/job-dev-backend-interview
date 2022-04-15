import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { ISale } from '../models';

const prisma = new PrismaClient()

class SaleService {
    async index() {
        const sale = await prisma.$queryRawUnsafe('SELECT * FROM "Sale"')
        return sale;
    }

    async show(id: number) {
        const sale = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Sale" WHERE (id = ${id})`
        )
          return sale; 
    }

    async store({ idProduct, description, price } : ISale) {
        try {
            const schema = Yup.object().shape({
                idProduct: Yup.number().required(),
                description: Yup.string().required(),
                price: Yup.number().required()
            });

            if (!(await schema.isValid({ idProduct, description, price }))) {
                throw new CustomError({
                code: 'VALIDATION_FAILS',
                message: 'Validation fails',
                status: 400,
                });
            }

            const sale = await prisma.$queryRaw`
                INSERT INTO "Sale" (
                        id_product,
                        description,
                        price
                        ) 
                VALUES (${idProduct}, 
                        ${description}, 
                        ${price});
            `
            return "Successful register!";
        } catch(e) {
        throw new CustomError({
            code: 'VALIDATION_FAILS',
            message: `Error ${e}`,
            status: 400,
          });
        }  
    }

    async update(id: number, data: ISale) {
        const schema = Yup.object().shape({
            idProduct: Yup.number().required(),
            description: Yup.string().required(),
            price: Yup.number().required()
        });

        if (!(await schema.isValid( data ))) {
            throw new CustomError({
              code: 'VALIDATION_FAILS',
              message: 'Validation fails',
              status: 400,
            });
        }
        const sale = await prisma.$executeRaw`
            UPDATE "Sale" SET 
            id_product = ${data.idProduct},
            description = ${data.description},
            price = ${data.price} WHERE id = ${id};
        `
        return sale;
    }
    
    async delete(id: number) {
        const sale = await prisma.$queryRawUnsafe(
            `DELETE FROM "Sale" WHERE (id = ${id})`
        )
          return sale; 
    }
}

export { SaleService };