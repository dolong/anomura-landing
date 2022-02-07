/*
  Warnings:

  - Added the required column `numberOfInvites` to the `WhiteList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WhiteList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallet" TEXT NOT NULL,
    "discordID" TEXT NOT NULL,
    "numberOfInvites" INTEGER NOT NULL
);
INSERT INTO "new_WhiteList" ("discordID", "id", "wallet") SELECT "discordID", "id", "wallet" FROM "WhiteList";
DROP TABLE "WhiteList";
ALTER TABLE "new_WhiteList" RENAME TO "WhiteList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
