/*
  Warnings:

  - Added the required column `crabId` to the `Anomuras` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anomuras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crabId" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "legs" TEXT NOT NULL,
    "shell" TEXT NOT NULL,
    "claws" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "playersWallet" TEXT,
    CONSTRAINT "Anomuras_playersWallet_fkey" FOREIGN KEY ("playersWallet") REFERENCES "Players" ("wallet") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Anomuras" ("background", "body", "claws", "id", "image", "legs", "owner", "playersWallet", "shell") SELECT "background", "body", "claws", "id", "image", "legs", "owner", "playersWallet", "shell" FROM "Anomuras";
DROP TABLE "Anomuras";
ALTER TABLE "new_Anomuras" RENAME TO "Anomuras";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
