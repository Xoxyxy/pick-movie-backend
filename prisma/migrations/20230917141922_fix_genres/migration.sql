/*
  Warnings:

  - You are about to drop the column `geners` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "geners",
ADD COLUMN     "genres" TEXT[];
