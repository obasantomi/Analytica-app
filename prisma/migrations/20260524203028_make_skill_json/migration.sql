/*
  Warnings:

  - Changed the type of `skill` on the `SkillScoreEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skill` on the `UserSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SkillScoreEvent" DROP COLUMN "skill",
ADD COLUMN     "skill" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "skill",
ADD COLUMN     "skill" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SkillScoreEvent_userId_skill_key" ON "SkillScoreEvent"("userId", "skill");
