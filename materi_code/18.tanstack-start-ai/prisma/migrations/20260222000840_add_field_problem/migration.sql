/*
  Warnings:

  - Added the required column `problem` to the `Motivate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Motivate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "problem" TEXT NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Motivate" ("content", "id") SELECT "content", "id" FROM "Motivate";
DROP TABLE "Motivate";
ALTER TABLE "new_Motivate" RENAME TO "Motivate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
