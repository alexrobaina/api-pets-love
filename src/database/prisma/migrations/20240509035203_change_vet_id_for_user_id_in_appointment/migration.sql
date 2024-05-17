/*
  Warnings:

  - You are about to drop the column `vetId` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_vetId_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "vetId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
