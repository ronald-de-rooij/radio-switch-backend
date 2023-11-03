/*
  Warnings:

  - You are about to drop the column `url` on the `streams` table. All the data in the column will be lost.
  - Added the required column `streamUrl` to the `streams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streams" DROP COLUMN "url",
ADD COLUMN     "streamUrl" TEXT NOT NULL;
