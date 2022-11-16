/*
  Warnings:

  - You are about to alter the column `balance` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;
