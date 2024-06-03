-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patrimonio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "defeito" TEXT NOT NULL,
    "numeroPatrimonio" TEXT NOT NULL
);
INSERT INTO "new_Patrimonio" ("defeito", "id", "numeroPatrimonio") SELECT "defeito", "id", "numeroPatrimonio" FROM "Patrimonio";
DROP TABLE "Patrimonio";
ALTER TABLE "new_Patrimonio" RENAME TO "Patrimonio";
PRAGMA foreign_key_check("Patrimonio");
PRAGMA foreign_keys=ON;
