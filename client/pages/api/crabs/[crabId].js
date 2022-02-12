import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function crabHandler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.crabId);
                const crab = await prisma.Anomuras.findFirst({
                    where: {
                        crabId: id,
                    },
                });

                if (crab) {
                    res.status(200).json({
                        name: `Crab ${crab.id}`,
                        description: "Crab test",
                        attributes: [
                            {
                                trait_type: "Background",
                                value: crab.background,
                            },
                            {
                                trait_type: "Body",
                                value: crab.body,
                            },
                            {
                                trait_type: "Claws",
                                value: crab.claws,
                            },
                            {
                                trait_type: "Legs",
                                value: crab.legs,
                            },
                            {
                                trait_type: "Shell",
                                value: crab.shell,
                            },
                            {
                                trait_type: "Head Pieces",
                                value: "null",
                            },
                        ],
                        image: crab.image,
                    });
                } else {
                    res.status(200).json({
                        name: `Crab ${id}`,
                        description: "Unminted crab",
                        attributes: [
                            {
                                trait_type: "Background",
                                value: null,
                            },
                            {
                                trait_type: "Body",
                                value: null,
                            },
                            {
                                trait_type: "Claws",
                                value: null,
                            },
                            {
                                trait_type: "Legs",
                                value: null,
                            },
                            {
                                trait_type: "Shell",
                                value: null,
                            },
                            {
                                trait_type: "Head Pieces",
                                value: null,
                            },
                        ],
                    });
                }
            } catch (err) {
                res.status(500).json({ err });
            }

            break;
        case "POST":
            try {
                const {
                    data: { background, body, legs, claws, shell, image },
                } = req.body;

                const crabId = parseInt(req.query.crabId);

                //TODO: validation before create / upsert / update

                const newCrab = await prisma.anomuras.create({
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
                res.status(200).json({ data: newCrab });
            } catch (err) {
                res.status(500).json({ err });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
