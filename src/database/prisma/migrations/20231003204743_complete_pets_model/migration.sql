/*
  Warnings:

  - You are about to drop the column `caredBy` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `PetOnUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_caredBy_fkey";

-- DropForeignKey
ALTER TABLE "PetOnUser" DROP CONSTRAINT "PetOnUser_petId_fkey";

-- DropForeignKey
ALTER TABLE "PetOnUser" DROP CONSTRAINT "PetOnUser_userId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "caredBy",
DROP COLUMN "type",
ADD COLUMN     "adopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "shelterId" TEXT,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "vaccineId" TEXT,
ADD COLUMN     "weight" TEXT,
ALTER COLUMN "breed" DROP NOT NULL;

-- DropTable
DROP TABLE "PetOnUser";

-- CreateTable
CREATE TABLE "PetsCaredByVolunteer" (
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PetsCaredByVolunteer_pkey" PRIMARY KEY ("petId","userId")
);

-- CreateTable
CREATE TABLE "PetVaccine" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "vaccine_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetVaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "diagnosis" TEXT,
    "treatment" TEXT,
    "medications" TEXT[],
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "veterinarian" TEXT,
    "clinicName" TEXT,
    "notes" TEXT,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetsCaredByVolunteer" ADD CONSTRAINT "PetsCaredByVolunteer_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetsCaredByVolunteer" ADD CONSTRAINT "PetsCaredByVolunteer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetVaccine" ADD CONSTRAINT "PetVaccine_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetVaccine" ADD CONSTRAINT "PetVaccine_vaccine_id_fkey" FOREIGN KEY ("vaccine_id") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
