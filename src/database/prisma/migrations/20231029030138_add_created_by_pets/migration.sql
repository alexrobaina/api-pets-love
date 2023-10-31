/*
  Warnings:

  - Added the required column `title` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "createdBy" TEXT;
