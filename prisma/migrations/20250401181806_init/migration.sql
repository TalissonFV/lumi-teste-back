-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "numeroCliente" TEXT NOT NULL,
    "mesFatura" TEXT NOT NULL,
    "qtdEnergiaEletrica" INTEGER NOT NULL,
    "qtdEnergiaSCEE" INTEGER NOT NULL,
    "qtdEnergiaCompensada" INTEGER NOT NULL,
    "consumoEnergiaEletrica" INTEGER NOT NULL,
    "valorEnergiaEletrica" DOUBLE PRECISION NOT NULL,
    "valorEnergiaSCEE" DOUBLE PRECISION NOT NULL,
    "valorEnergiaCompensada" DOUBLE PRECISION NOT NULL,
    "valorContribuicaoIlumPublicaMunicipal" DOUBLE PRECISION NOT NULL,
    "valorTotalSemGD" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
