import { prisma } from "./PrismaContext";

export const getAnomuraById = async (crabId) => {
    return await prisma.anomuras.findUnique({
        where: {
            crabId: parseInt(crabId),
        },
        include: {
            anomuraEquipments: true
        }
    });
};

export const getAllCrabs = async (crabId) => {
    return await prisma.anomuras.findMany({
        where: {
            crabId,
        },
        include: {
            anomuraEquipments: true
        }
    });
};

export const updateCrabById = async (crabData) => {
    const { crabId, image, body, legs, claws, shell, headpieces, background } = crabData;
    console.log("*****prisma update anomura image by id");
    return await prisma.anomuras.update({
        where: {
            id: crabId,
        },
        data: {
            image,
        },
    });
};

export const createCrab = async (crabData) => {
    const { crabId, background, body, legs, claws, shell, image, headpieces } = crabData;

    return await prisma.anomuras.create({
        data: {
            crabId,
            owner: "0x123456",
            background,
            legs,
            shell,
            claws,
            body,
            image,
            headpieces,
        },
    });
};
