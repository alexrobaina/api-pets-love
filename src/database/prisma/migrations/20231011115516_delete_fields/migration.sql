/*
  Warnings:

  - You are about to drop the column `vaccineId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_vaccineId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "vaccineId";
