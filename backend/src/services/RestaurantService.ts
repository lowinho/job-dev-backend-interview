import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { IRestaurant } from '../models';

const prisma = new PrismaClient()

class RestaurantService {
    async index() {
        const restaurant = await prisma.$queryRawUnsafe('SELECT * FROM "Restaurant"')
        return restaurant;
    }

    async show(id: number) {
        const restaurant = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Restaurant" r WHERE r.id = ${id}`
        )

        const photo = await prisma.$queryRawUnsafe(
            `SELECT * FROM "PhotoRestaurant" pr WHERE pr.id_restaurant = ${id}`
        )

        const schedule = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Schedule" s WHERE s.id_restaurant = ${id}`
        )

        const data = {
            restaurant,
            photo: photo,
            schedule: schedule
        }
        return data; 
    }

    async store({ name, street, number, district, city, state } : IRestaurant) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                street: Yup.string().required(),
                number: Yup.number().required(),
                district: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
            });
    
            if (!(await schema.isValid({ name, street, number, district, city, state }))) {
                throw new CustomError({
                  code: 'VALIDATION_FAILS',
                  message: 'Validation fails',
                  status: 400,
                });
            }
    
            await prisma.$queryRaw`
                INSERT INTO "Restaurant" (
                        name, 
                        street,
                        number,
                        district,
                        city,
                        state
                        ) 
                VALUES (${name}, 
                        ${street}, 
                        ${number}, 
                        ${district}, 
                        ${city}, 
                        ${state});
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

    async update(id: number, data: IRestaurant) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                street: Yup.string().required(),
                number: Yup.number().required(),
                district: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
            });

            if (!(await schema.isValid( data ))) {
                throw new CustomError({
                code: 'VALIDATION_FAILS',
                message: 'Validation fails',
                status: 400,
                });
            }

            await prisma.$executeRaw`
                UPDATE "Restaurant" SET 
                name = ${data.name},
                street = ${data.street},
                number = ${data.number},
                district = ${data.district},
                city = ${data.city},
                state = ${data.state} WHERE id = ${id};
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
        const restaurant = await prisma.$queryRawUnsafe(
            `DELETE FROM "Restaurant" WHERE (id = ${id})`
        )
          return restaurant; 
    }
}

export { RestaurantService };