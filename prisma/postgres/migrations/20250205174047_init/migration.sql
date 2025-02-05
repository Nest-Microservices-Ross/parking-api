-- AlterTable
ALTER TABLE "ParkingSpot" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
