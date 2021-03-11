-- CreateTable
CREATE TABLE "ShopNote" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "urgent" BOOLEAN NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "noteId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("noteId") REFERENCES "ShopNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
