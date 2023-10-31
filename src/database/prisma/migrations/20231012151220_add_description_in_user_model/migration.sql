/*
  Warnings:

  - You are about to drop the column `veterinarian` on the `MedicalRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "veterinarian",
ADD COLUMN     "vetId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
