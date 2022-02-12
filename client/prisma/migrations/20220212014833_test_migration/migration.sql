-- CreateTable
CREATE TABLE "WhiteList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallet" TEXT NOT NULL,
    "discordID" TEXT NOT NULL,
    "numberOfInvites" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Anomuras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crabId" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "legs" TEXT NOT NULL,
    "shell" TEXT NOT NULL,
    "claws" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'null',
    "playersWallet" TEXT,
    CONSTRAINT "Anomuras_playersWallet_fkey" FOREIGN KEY ("playersWallet") REFERENCES "Players" ("wallet") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Players" (
    "wallet" TEXT NOT NULL PRIMARY KEY
);
