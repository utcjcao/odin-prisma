-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dataURL" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_id_key" ON "files"("id");
