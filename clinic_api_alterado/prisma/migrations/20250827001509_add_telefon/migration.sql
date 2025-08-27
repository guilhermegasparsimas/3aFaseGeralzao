/*
  Warnings:

  - You are about to alter the column `telefone` on the `paciente` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `paciente` MODIFY `telefone` INTEGER NOT NULL;
