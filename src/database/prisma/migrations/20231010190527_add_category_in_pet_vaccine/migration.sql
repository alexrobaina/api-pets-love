/*
  Warnings:

  - Added the required column `category` to the `PetVaccine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetVaccine" ADD COLUMN     "category" TEXT NOT NULL;
