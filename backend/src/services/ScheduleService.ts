import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';
import { CustomError } from 'express-handler-errors';
import { ISchedule } from '../models';
import { validationTime } from '../functions/validationTime';

const prisma = new PrismaClient()

class ScheduleService {
    async index() {
        const schedule = await prisma.$queryRawUnsafe(`SELECT * FROM "Schedule"`)
        return schedule;
    }

    async show(id: number) {
        const schedule = await prisma.$queryRawUnsafe(
            `SELECT * FROM "Schedule" WHERE (id = ${id})`
        )
          return schedule;
    }

    async store({ idRestaurant, idSale, dayWeek, initialTime, endTime } : ISchedule) {
        try {
            const schema = Yup.object().shape({
                idRestaurant: Yup.number().nullable(),
                idSale: Yup.number().nullable(),
                dayWeek: Yup.string().required(),
                initialTime: Yup.string().required(),
                endTime: Yup.string().required(),
            });
    
            if (!(await schema.isValid({ idRestaurant, idSale, dayWeek, initialTime, endTime }))) {
                throw new CustomError({
                  code: 'VALIDATION_FAILS',
                  message: 'Validation fails',
                  status: 400,
                });
            }

            if (!validationTime(initialTime, endTime)) return;

            await prisma.$queryRaw`
                INSERT INTO "Schedule" (
                        id_restaurant,
                        id_sale, 
                        day_week,
                        initial_time,
                        end_time
                        ) 
                VALUES (${idRestaurant}, 
                        ${idSale},
                        ${dayWeek}, 
                        ${initialTime}, 
                        ${endTime});
            `
            return "Successful register!";
        } catch(e) {
            throw new CustomError({
                code: 'VALIDATION_FAILS',
                message: `${e}`,
                status: 400,
              });
        }   
    }

    async update(id: number, data: ISchedule) {
        try {
            const schema = Yup.object().shape({
                idRestaurant: Yup.number().nullable(),
                idSale: Yup.number().nullable(),
                dayWeek: Yup.string().required(),
                initialTime: Yup.string().required(),
                endTime: Yup.string().required(),
            });
    
            if (!(await schema.isValid( data ))) {
                throw new CustomError({
                  code: 'VALIDATION_FAILS',
                  message: 'Validation fails',
                  status: 400,
                });
            }

            if (!validationTime(data.initialTime, data.endTime)) return;
    
            await prisma.$executeRaw`
                UPDATE "Schedule" SET 
                id_restaurant = ${data.idRestaurant},
                id_sale = ${data.idSale},
                day_week = ${data.dayWeek},
                initial_time = ${data.initialTime},
                end_time = ${data.endTime} WHERE id = ${id};
            `
            return "Updated Register!";
        } catch(e) {
            throw new CustomError({
                code: 'VALIDATION_FAILS',
                message: `${e}`,
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

      async getBySale(id: number) {
        const photo = await prisma.$queryRawUnsafe(
          `SELECT * FROM "PhotoRestaurant" WHERE (id_sale = ${id})`
      )
      
        return photo; 
      }

    async delete(id: number) {
        const schedule = await prisma.$queryRawUnsafe(
            `DELETE FROM "Schedule" WHERE (id = ${id})`
        )
          return schedule; 
    }
}

export { ScheduleService };