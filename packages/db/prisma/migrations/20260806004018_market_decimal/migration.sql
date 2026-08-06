/*
  Warnings:

  - Added the required column `decimals` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "decimals" INTEGER NOT NULL;
