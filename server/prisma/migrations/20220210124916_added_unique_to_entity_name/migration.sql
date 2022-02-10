/*
  Warnings:

  - You are about to drop the `EntityValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EntityToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `values` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entity` ADD COLUMN `values` VARCHAR(225) NOT NULL;

-- DropTable
DROP TABLE `EntityValue`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_EntityToTag`;

-- CreateIndex
CREATE UNIQUE INDEX `Entity_name_key` ON `Entity`(`name`);
