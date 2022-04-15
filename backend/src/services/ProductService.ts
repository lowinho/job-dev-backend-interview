import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { IProduct } from '../models';

const prisma = new PrismaClient();

interface IProductBench {
    id_restaurant: number;
}

class ProductService {
    async index() {
        const product = await prisma.$queryRawUnsafe('SELECT * FROM "Product"')
        return product;
    }

    async show(id: number) {
        const product = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Product" WHERE (id = ${id})`
        ) as IProductBench[];

        const photo = await prisma.$queryRawUnsafe(
            `SELECT * FROM "PhotoProduct" pp WHERE pp.id_product = ${id}`
        )

        const sale = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Sale" s WHERE s.id_product = ${id} ;`
        )

        const restaurant = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Restaurant" r WHERE r.id = ${product[0].id_restaurant} ;`
        )

        console.log();

        const data = {
            product,
            photo: photo,
            sale: sale
        }
          return data; 
    }

    async store({ idRestaurant, name, price, category, isSale } : IProduct) {
        try {
                const schema = Yup.object().shape({
                    idRestaurant: Yup.number().required(),
                    name: Yup.string().required(),
                    price: Yup.number().required(),
                    category: Yup.string().required(),
                    isSale: Yup.boolean(),
                });

                if (!(await schema.isValid({ idRestaurant, name, price, category, isSale }))) {
                    throw new CustomError({
                    code: 'VALIDATION_FAILS',
                    message: 'Validation fails',
                    status: 400,
                    });
                }

                const product = await prisma.$queryRaw`
                    INSERT INTO "Product" (
                            id_restaurant, 
                            name,
                            price,
                            category,
                            is_sale
                            ) 
                    VALUES (${idRestaurant}, 
                            ${name}, 
                            ${price}, 
                            ${category}, 
                            ${isSale});
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

    async update(id: number, data: IProduct) {
        try {
                const schema = Yup.object().shape({
                    idRestaurant: Yup.number().required(),
                    name: Yup.string().required(),
                    price: Yup.number().required(),
                    category: Yup.string().required(),
                    isSale: Yup.boolean(),
                });

                if (!(await schema.isValid( data ))) {
                    throw new CustomError({
                    code: 'VALIDATION_FAILS',
                    message: 'Validation fails',
                    status: 400,
                    });
                }
                const product = await prisma.$executeRaw`
                    UPDATE "Product" SET 
                    id_restaurant = ${data.idRestaurant},
                    name = ${data.name},
                    price = ${data.price},
                    category = ${data.category},
                    is_sale = ${data.isSale} WHERE id = ${id};
                `
                return "Updated Register!";
            } catch(e) {
            throw new CustomError({
                code: 'VALIDATION_FAILS',
                message: `Error ${e}`,
                status: 400,
            });
        }
    }

    async delete(id: number) {
        const product = await prisma.$queryRawUnsafe(
            `DELETE FROM "Product" WHERE (id = ${id})`
        )
          return product; 
    }
}

export { ProductService };