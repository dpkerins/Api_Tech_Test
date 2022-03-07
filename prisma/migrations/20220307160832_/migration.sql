/*
  Warnings:

  - Added the required column `rank` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "rank" TEXT NOT NULL
);
INSERT INTO "new_Player" ("dob", "first_name", "id", "last_name", "nationality", "score") SELECT "dob", "first_name", "id", "last_name", "nationality", "score" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
