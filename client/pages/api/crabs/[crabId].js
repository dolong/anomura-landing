import { getAnomuraById } from "repositories/crabs";
const sharp = require("sharp");
import { prisma } from "../../../repositories/PrismaContext";

import { EquipmentType, EquipmentRarity } from '@prisma/client'
const {
    getBody,
    getClaws,
    getShell,
    getLegs,
    getBackground,
    getHeadPieces,
} = require("../../../scripts/crabData");

const crabImageViewerHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.crabId);
                let crab = await getAnomuraById(id);

                if (crab) {

                    let crabImage = await getCorrectAnomuraImage(crab);

                    let hasEquipment = await hasEquipments(crab);

                    res.setHeader('Cache-Control', 'max-age=0, s-maxage=300, stale-while-revalidate');
                    res.status(200).json({
                        name: crab.name,
                        description: crab.description,
                        animation_url: `${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/${crab.crabId}`,
                        image: crabImage, //crab.image,
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
                                trait_type: "HeadPieces",
                                value: crab.headpieces,
                            },
                            {
                                trait_type: "Has Equipments",
                                value: hasEquipment.toString(),
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
                res.status(500).json({ message: err.message });
            }

            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
export default crabImageViewerHandler


const hasEquipments = async (crab) => {
    let { equipments } = crab;

    let hasAnyEquipment = false;
    if (equipments?.length > 0) {

        for (let equipment of equipments) {
            if (equipment.isEquipped) {
                hasAnyEquipment = true;
            }
        }
    }
    return hasAnyEquipment;
}

const getCorrectAnomuraImage = async (crab) => {
    const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;


    let { background, body, claws, legs, shell, headpieces, equipments } = crab;
    let backgroundToDraw = background;
    let bodyToDraw = body;
    let clawsToDraw = claws;
    let legsToDraw = legs;
    let shellToDraw = shell;
    let headpiecesToDraw = headpieces;
    let isDrawHeadpieces = false;

    let isCustomImage = false;
    if (equipments?.length > 0) {
        for (let equipment of equipments) {
            if (equipment.isEquipped) {
                switch (equipment.equipmentType) {
                    case EquipmentType.BODY:
                        bodyToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    case EquipmentType.CLAWS:
                        clawsToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    case EquipmentType.LEGS:
                        legsToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    case EquipmentType.SHELL:
                        shellToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    case EquipmentType.HEADPIECES:
                        headpiecesToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    case EquipmentType.HABITAT:
                        backgroundToDraw = equipment.equipmentName;
                        isCustomImage = true;
                        break;
                    default:
                        break;
                }
            }
        }
    }
    if (!isCustomImage) {
        return crab.image;
    }

    if (headpiecesToDraw?.toString().trim() !== "None") {
        isDrawHeadpieces = true;
    }

    let backgroundName = getBackground(backgroundToDraw);
    let shellName = getShell(shellToDraw);
    let legsName = getLegs(legsToDraw);
    let bodyName = getBody(bodyToDraw);
    let clawsName = getClaws(clawsToDraw);
    let headpiecesName = "";
    if (isDrawHeadpieces) headpiecesName = getHeadPieces(headpiecesToDraw);

    let anomuraSvg = await prisma.anomuraPartSVG.findMany();

    let backgroundLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Background" && el.attribute === backgroundName
    );
    let backgroundLayer = anomuraSvg[backgroundLayerIndex].svg;

    let shellLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Shell" && el.attribute === shellName
    );
    let shellLayer = anomuraSvg[shellLayerIndex].svg;

    let legsLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Legs" && el.attribute === legsName
    );
    let legsLayer = anomuraSvg[legsLayerIndex].svg;

    let bodyLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Body" && el.attribute === bodyName
    );
    let bodyLayer = anomuraSvg[bodyLayerIndex].svg;

    let clawsLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Claws" && el.attribute === clawsName
    );
    let clawsLayer = anomuraSvg[clawsLayerIndex].svg;

    let shadowLayerIndex = anomuraSvg.findIndex(
        (el) => el.part === "Shadow" && el.attribute === "Shadow"
    );
    let shadowLayer = anomuraSvg[shadowLayerIndex].svg;

    let headpiecesLayer = " ";
    if (headpiecesName.trim() !== "" && headpiecesName != "None") {
        let headpiecesLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "HeadPieces" && el.attribute === headpiecesName
        );
        headpiecesLayer = anomuraSvg[headpiecesLayerIndex].svg;
    }

    let combineLayer =
        SVG_PREFIXTAG +
        backgroundLayer +
        shadowLayer +
        shellLayer +
        headpiecesLayer +
        legsLayer +
        bodyLayer +
        clawsLayer +
        "</svg>";

    const pngBuffer = await sharp(Buffer.from(combineLayer)).png().toBuffer();
    let base64png = `data:image/png;base64,` + Buffer.from(pngBuffer).toString("base64");

    console.log("This anomura image is customized")
    return base64png;
}