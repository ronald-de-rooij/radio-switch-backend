/*
  Warnings:

  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StreamCategory" AS ENUM ('RADIO');

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "category" "StreamCategory" NOT NULL DEFAULT 'RADIO';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hash";
