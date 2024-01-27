-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "clerkId" DROP NOT NULL;
