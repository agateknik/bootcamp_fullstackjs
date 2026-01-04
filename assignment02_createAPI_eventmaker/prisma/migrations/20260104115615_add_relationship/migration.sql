-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "Participants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participants" ("email", "eventId", "id", "name") SELECT "email", "eventId", "id", "name" FROM "Participants";
DROP TABLE "Participants";
ALTER TABLE "new_Participants" RENAME TO "Participants";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
