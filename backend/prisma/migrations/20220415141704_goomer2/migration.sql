-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_id_restaurant_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_id_sale_fkey";

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "id_restaurant" DROP NOT NULL,
ALTER COLUMN "id_sale" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
