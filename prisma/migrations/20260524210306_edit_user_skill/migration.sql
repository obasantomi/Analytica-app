/*
  Warnings:

  - You are about to drop the `SkillScoreEvent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserSkill` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "SkillScoreEvent";

-- CreateIndex
CREATE UNIQUE INDEX "UserSkill_userId_key" ON "UserSkill"("userId");
