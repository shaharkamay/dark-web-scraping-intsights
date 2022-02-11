/*
  Warnings:

  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `keyword` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Alert` ADD COLUMN `keyword` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Keyword`;
