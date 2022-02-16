import { getCrabById, createCrab, updateCrabById } from "../../../repositories/crabs";

export default async function crabImageViewerHandler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.crabId);
                let crab = await getCrabById(id);

                if (crab) {
                    res.status(200).json({
                        name: `Crab ${crab.crabId}`,
                        description: "Crab test",
                        animation_url: `${process.env.WEBSITE_HOST}/imageviewer/animate/${crab.crabId}`,
                        image: `${process.env.WEBSITE_HOST}/imageviewer/animate/${crab.crabId}`,

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
                    });
                } else {
                    res.status(200).json({
                        name: `Crab ${id}`,
                        description: "Unminted crab",
                    });
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ err });
            }

            break;
        case "POST":
            try {
                const {
                    data: { background, body, legs, claws, shell, image },
                } = req.body;

                const crabId = parseInt(req.query.crabId);
                const existingCrab = getCrabById(crabId);

                if (existingCrab) {
                    console.log(
                        `Found existing crab ${crabId} with id: ${existingCrab.id}, updating data`
                    );

                    let crabId = existingCrab.id;
                    const updatedCrab = updateCrabById({
                        crabId,
                        background,
                        body,
                        legs,
                        claws,
                        shell,
                        image,
                    });

                    console.log(`Updated crab successfully`);
                    res.status(200).json({ data: updatedCrab });
                    return;
                }

                let newCrab = await createCrab({
                    crabId,
                    background,
                    body,
                    legs,
                    claws,
                    shell,
                    image,
                });
                console.log(`A new crab ${crabId} is created`);
                res.status(200).json({ data: newCrab });
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
