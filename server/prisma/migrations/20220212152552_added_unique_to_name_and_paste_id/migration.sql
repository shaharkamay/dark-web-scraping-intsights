/*
  Warnings:

  - A unique constraint covering the columns `[name,pasteId]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,alertId]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Alert_name_pasteId_key` ON `Alert`(`name`, `pasteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Keyword_name_alertId_key` ON `Keyword`(`name`, `alertId`);
