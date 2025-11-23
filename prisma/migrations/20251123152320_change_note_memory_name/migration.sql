/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoteChunk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoteTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "NoteChunk" DROP CONSTRAINT "NoteChunk_noteId_fkey";

-- DropForeignKey
ALTER TABLE "NoteTag" DROP CONSTRAINT "NoteTag_noteId_fkey";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "NoteChunk";

-- DropTable
DROP TABLE "NoteTag";

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "sourceType" "SourceType" NOT NULL DEFAULT 'TEXT',
    "sourceLink" TEXT DEFAULT '#',
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryChunk" (
    "id" TEXT NOT NULL,
    "memoryId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemoryChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryTag" (
    "id" TEXT NOT NULL,
    "memoryId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemoryTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryChunk" ADD CONSTRAINT "MemoryChunk_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryTag" ADD CONSTRAINT "MemoryTag_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
