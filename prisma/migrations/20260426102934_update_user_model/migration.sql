-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ANALYST', 'MANAGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "domain" TEXT[],
ADD COLUMN     "role" "UserRole";
