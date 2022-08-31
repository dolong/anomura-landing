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

    return await prisma.anomuras.update({
        where: {
            id: crabId,
        },
        data: {
            image,
        },
    });
};

export const createAnomura = async (crabData) => {
    const { crabId, background, body, legs, claws, shell, image, headpieces, name, description } = crabData;

    return await prisma.anomuras.create({
        data: {
            crabId,
            owner: "",
            background,
            legs,
            shell,
            claws,
            body,
            image,
            headpieces,
            name,
            description
        },
    });
};
