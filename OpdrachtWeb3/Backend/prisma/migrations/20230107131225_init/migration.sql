-- CreateTable
CREATE TABLE `Groep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `aanmaakdatum` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `geldig` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opdracht` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(512) NOT NULL,
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `aanmaakdatum` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpdrachtElement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `beschrijving` VARCHAR(4096) NOT NULL,
    `minuten` INTEGER NOT NULL DEFAULT 1,
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `aanmaakdatum` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `opdrachtId` INTEGER NOT NULL,

    UNIQUE INDEX `OpdrachtElement_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rapport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL DEFAULT 0,
    `extraMinuten` INTEGER NOT NULL DEFAULT 0,
    `aanmaakdatum` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `studentId` INTEGER NOT NULL,
    `opdrachtElementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NOT NULL,
    `gebruikersNaam` VARCHAR(45) NOT NULL,
    `familieNaam` VARCHAR(45) NOT NULL,
    `voorNaam` VARCHAR(45) NOT NULL,
    `sorteerNaam` VARCHAR(90) NOT NULL,
    `email` VARCHAR(90) NOT NULL,
    `aanmaakDatum` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `geldig` INTEGER NOT NULL DEFAULT 1,
    `groepId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VraagStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beschrijving` VARCHAR(255) NOT NULL,
    `aanmaakdatum` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `geldig` INTEGER NULL DEFAULT 1,
    `rapportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OpdrachtElement` ADD CONSTRAINT `OpdrachtElement_opdrachtId_fkey` FOREIGN KEY (`opdrachtId`) REFERENCES `Opdracht`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_opdrachtElementId_fkey` FOREIGN KEY (`opdrachtElementId`) REFERENCES `OpdrachtElement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_groepId_fkey` FOREIGN KEY (`groepId`) REFERENCES `Groep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VraagStudent` ADD CONSTRAINT `VraagStudent_rapportId_fkey` FOREIGN KEY (`rapportId`) REFERENCES `Rapport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
