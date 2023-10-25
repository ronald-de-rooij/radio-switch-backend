/*
  Warnings:

  - Made the column `name` on table `streams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `streams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "streams" ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
