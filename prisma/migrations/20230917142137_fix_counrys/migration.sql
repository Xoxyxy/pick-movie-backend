/*
  Warnings:

  - You are about to drop the column `country` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "country",
ADD COLUMN     "countrys" TEXT[];
