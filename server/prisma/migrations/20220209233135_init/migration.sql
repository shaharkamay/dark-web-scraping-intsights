-- CreateTable
CREATE TABLE `pastes` (
    `id` VARCHAR(45) NOT NULL,
    `author` VARCHAR(225) NOT NULL,
    `title` VARCHAR(225) NOT NULL,
    `content` VARCHAR(768) NOT NULL,
    `date` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `content_UNIQUE`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
