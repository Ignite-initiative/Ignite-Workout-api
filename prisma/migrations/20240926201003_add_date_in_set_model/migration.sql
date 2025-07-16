/*
  Warnings:

  - You are about to drop the column `date` on the `Set` table. All the data in the column will be lost.
  - Added the required column `datePLanned` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "date",
ADD COLUMN     "dateCompleted" TIMESTAMP(3),
ADD COLUMN     "datePLanned" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "isCompleted" SET DEFAULT false;
