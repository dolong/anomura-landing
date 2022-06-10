const { CrabImagesBuilder } = require("../utils/crabImagesBuilder2");
import { prisma } from "./PrismaContext";

// const { getAllCrabs, getCrabById } = require("../../repositories/crabs");

async function main() {
    // await prisma.whiteList.deleteMany();
    console.log("Modifying Anomuras image prisma db");

    let allCrabs = await prisma.anomuras.findMany({
        orderBy: [
            {
                crabId: "asc",
            },
        ],
    });

    for (let i = 0; i <= allCrabs.length - 1; i++) {
        let crabId = allCrabs[i].crabId;
        let background = allCrabs[i].background;
        let body = allCrabs[i].body;
        let legs = allCrabs[i].legs;
        let claws = allCrabs[i].claws;
        let shell = allCrabs[i].shell;
        let headpieces = allCrabs[i].headpieces !== " " ? allCrabs[i].headpieces : " ";

        let crabImage = await CrabImagesBuilder({
            crabId,
            background,
            body,
            legs,
            claws,
            shell,
            headpieces,
        });

        const updatedCrab = await prisma.anomuras.update({
            where: {
                id: crabId,
            },
            data: {
                image: crabImage,
            },
        });
        // console.log({ anomura });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
