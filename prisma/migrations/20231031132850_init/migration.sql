/*
  Warnings:

  - You are about to drop the column `image` on the `streams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "streams" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
