/*
  Warnings:

  - The `aiFeedback` column on the `UserProject` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `aiQuestions` column on the `UserProject` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserProject" DROP COLUMN "aiFeedback",
ADD COLUMN     "aiFeedback" JSONB,
DROP COLUMN "aiQuestions",
ADD COLUMN     "aiQuestions" JSONB;
