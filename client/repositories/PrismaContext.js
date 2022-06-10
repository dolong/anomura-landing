
import * as Prisma from "@qhuynhvhslab/anomura-prisma-package";

export const { prisma, equipmentType } = await Prisma.createContext();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
