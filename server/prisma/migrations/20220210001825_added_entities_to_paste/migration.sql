/*
  Warnings:

  - You are about to drop the `pastes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pastes`;

-- CreateTable
CREATE TABLE `Paste` (
    `id` VARCHAR(45) NOT NULL,
    `author` VARCHAR(225) NOT NULL,
    `title` VARCHAR(225) NOT NULL,
    `content` VARCHAR(768) NOT NULL,
    `date` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `content_UNIQUE`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `pasteId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Entity_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(45) NOT NULL,
    `entityId` INTEGER NOT NULL,

    UNIQUE INDEX `EntityValue_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
