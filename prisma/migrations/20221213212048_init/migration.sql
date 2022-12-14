-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactInformationId_fkey";

-- DropIndex
DROP INDEX "ContactInformation.email_unique";

-- AlterTable
ALTER TABLE "ContactInformation" ADD CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactInformationId_fkey" FOREIGN KEY ("contactInformationId") REFERENCES "ContactInformation"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User_contactInformationId_unique" RENAME TO "User_contactInformationId_key";
