/*
  Warnings:

  - A unique constraint covering the columns `[name,pasteId]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Entity_name_pasteId_key` ON `Entity`(`name`, `pasteId`);
