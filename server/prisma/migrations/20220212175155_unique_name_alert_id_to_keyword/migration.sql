/*
  Warnings:

  - A unique constraint covering the columns `[name,alertId]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Keyword_name_alertId_key` ON `Keyword`(`name`, `alertId`);
