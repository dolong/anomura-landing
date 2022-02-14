import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function crabImageViewer(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.crabId);
                const crab = await prisma.anomuras.findFirst({
                    where: {
                        crabId: id,
                    },
                    select: {
                        crabId: true,
                        background: true,
                        shell: true,
                        legs: true,
                        claws: true,
                        body: true,
                    },
                });
                
                if (crab) {
                    res.status(200).json(crab);
                } else {
                    res.status(200).json({
                        crabId: id,
                        background: "unminted",
                        shell: "unminted",
                        legs: "unminted",
                        claws: "unminted",
                        body: "unminted",
                    });
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ err });
            }

            break;

        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

/** in case there is issue with db connection, can use this template for testing
 let crab = {
                    crabId: 998,
                    background: "science_lab",
                    shell: "Majestic metal_alembic",
                    legs: "snow_1",
                    claws: "Indestructible snow_icycle",
                    body: "Graceful partner_kongz",
                };
 */