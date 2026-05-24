/*
  Warnings:

  - You are about to drop the column `metadata` on the `Dataset` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `Dataset` table. All the data in the column will be lost.
  - Added the required column `datasetConfig` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "metadata",
DROP COLUMN "sourceUrl",
ADD COLUMN     "datasetConfig" JSONB NOT NULL;
