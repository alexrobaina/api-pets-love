/*
  Warnings:

  - The `status` column on the `PetVaccine` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VaccineStatus" AS ENUM ('DONE', 'PENDING', 'NOT_APPLICABLE');

-- AlterTable
ALTER TABLE "PetVaccine" DROP COLUMN "status",
ADD COLUMN     "status" "VaccineStatus" NOT NULL DEFAULT 'PENDING';
