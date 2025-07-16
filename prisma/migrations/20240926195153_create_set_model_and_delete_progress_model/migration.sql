/*
  Warnings:

  - You are about to drop the column `dateCompleted` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `datePlanned` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `repsCompleted` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `repsPlanned` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `rir` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `setsCompleted` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `setsPlanned` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `weightCompleted` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `weightPlanned` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "dateCompleted",
DROP COLUMN "datePlanned",
DROP COLUMN "repsCompleted",
DROP COLUMN "repsPlanned",
DROP COLUMN "rir",
DROP COLUMN "setsCompleted",
DROP COLUMN "setsPlanned",
DROP COLUMN "weightCompleted",
DROP COLUMN "weightPlanned",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "Progress";

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'valid',
    "repsPlanned" INTEGER NOT NULL,
    "weightPlanned" DOUBLE PRECISION NOT NULL,
    "repsCompleted" INTEGER,
    "weightUsed" DOUBLE PRECISION,
    "rir" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
