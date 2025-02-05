/*
  Warnings:

  - You are about to drop the column `clientId` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `reservationEnd` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `reservationStart` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `reservedAt` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `reservedById` on the `ParkingSpot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_reservedById_fkey";

-- AlterTable
ALTER TABLE "ParkingSpot" DROP COLUMN "clientId",
DROP COLUMN "reservationEnd",
DROP COLUMN "reservationStart",
DROP COLUMN "reservedAt",
DROP COLUMN "reservedById";

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "reservationStart" TIMESTAMP(3) NOT NULL,
    "reservationEnd" TIMESTAMP(3) NOT NULL,
    "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carType" TEXT,
    "parkingSpotId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "reservedById" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_parkingSpotId_fkey" FOREIGN KEY ("parkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservedById_fkey" FOREIGN KEY ("reservedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
