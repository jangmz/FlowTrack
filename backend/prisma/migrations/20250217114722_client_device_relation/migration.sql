-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "deviceId" INTEGER;

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "clientId" INTEGER;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
