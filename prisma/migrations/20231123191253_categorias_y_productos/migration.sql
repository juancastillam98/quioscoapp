/*
  Warnings:

  - You are about to drop the column `nmbre` on the `Categoria` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Categoria` DROP COLUMN `nmbre`,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;
