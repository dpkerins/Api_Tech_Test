/*
  Warnings:

  - A unique constraint covering the columns `[first_name,last_name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_first_name_last_name_key" ON "Player"("first_name", "last_name");
