import { prisma } from "./PrismaContext";

export const getCrabById = async (crabId) => {
    return await prisma.anomuras.findFirst({
        where: {
            crabId,
        },
    });
};

export const getAllCrabs = async (crabId) => {
    return await prisma.anomuras.findMany({
        where: {
            crabId,
        },
    });
};

export const updateCrabById = async (crabData) => {
    const { crabId, image } = crabData;

    // should only update image here, other parts currently synced with contract
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
    const { crabId, background, body, legs, claws, shell, image } = crabData;
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
        },
    });
};
