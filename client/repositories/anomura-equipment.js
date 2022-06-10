import { prisma, equipmentType as EquipmentType } from "./PrismaContext";

export const getAnomuraEquipmentById = async (equipmentId) => {
    return await prisma.anomuraEquipment.findFirst({
        where: {
            equipmentId,
        },
    });
};

export const getAnomuraPartImageByName = async (equipmentName) => {
    return await prisma.anomuraPartImage.findUnique({
        where: {
            name: equipmentName,
        },
    });
};

export const getAllAnomuraPartImages = async () => {
    return await prisma.anomuraPartImage.findMany();
};

// export const getAllCrabs = async (crabId) => {
//     return await prisma.anomuras.findMany({
//         where: {
//             crabId,
//         },
//     });
// };

// export const updateCrabById = async (crabData) => {
//     const { crabId, image, body, legs, claws, shell, headpieces, background } = crabData;
//     console.log("*****prisma update anomura image by id");
//     return await prisma.anomuras.update({
//         where: {
//             id: crabId,
//         },
//         data: {
//             image,
//         },
//     });
// };


export const updateAnomuraEquipmentImageById = async ({ equipmentId, image }) => {

    return await prisma.anomuraEquipment.update(
        {
            where: {
                equipmentId
            },
            data: {
                image
            },
        });
};

export const createEquipment = async (equipmentData) => {
    const { equipmentId, name, equipmentType, image } = equipmentData;
    let type;
    switch (equipmentType) {
        case 0:
            type = EquipmentType.CLAWS;
            break;
        case 1:
            type = EquipmentType.LEGS;
            break;
        case 2:
            type = EquipmentType.BODY;
            break;
        case 3:
            type = EquipmentType.SHELL;
            break;
        case 4:
            type = EquipmentType.HEADPIECES;
            break;
        default:
            throw new Error("Incorrect equipment type passed in")
    }
    return await prisma.anomuraEquipment.create({
        data: {
            equipmentId,
            name,
            type,
            image
        },
    });
};
