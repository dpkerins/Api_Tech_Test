-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dob" INTEGER NOT NULL,
    "score" INTEGER NOT NULL
);
