/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_userId_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "recipientId" TEXT;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
