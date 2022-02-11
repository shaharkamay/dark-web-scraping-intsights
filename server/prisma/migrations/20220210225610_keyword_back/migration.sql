/*
  Warnings:

  - You are about to drop the column `keyword` on the `Alert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Alert` DROP COLUMN `keyword`;

-- CreateTable
CREATE TABLE `Keyword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `alertId` INTEGER NOT NULL,

    UNIQUE INDEX `Keyword_id_key`(`id`),
    UNIQUE INDEX `Keyword_alertId_key`(`alertId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
