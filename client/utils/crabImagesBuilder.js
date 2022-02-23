import { getBody, getClaws, getShell, getLegs, getBackground, getHeadPieces } from "utils/crabData";
import fs from "fs";
import path from "path";
const tools = require("simple-svg-tools");

const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

// return the location of the image, based on id
export const CrabImagesBuilder = async (crab) => {
    const { crabId, background, body, legs, claws, shell, headpieces } = crab;
    const dirRelativeToPublicFolder = "img/imageviewer";
    const imageDir = path.resolve("./public", dirRelativeToPublicFolder);
    const crabImage = `${imageDir}/Anomuras/${crabId}.svg`;
        
    let isFileExist = await fileExists(crabImage)
    
    if (isFileExist) {
        console.log("crab image already existed, return image path");
        
    } else {
        console.log("crab image not exists, building new image");
        let backgroundName = getBackground(background);
        let shellName = getShell(shell);
        let legsName = getLegs(legs);
        let bodyName = getBody(body);
        let clawsName = getClaws(claws);
        let headpiecesName = getHeadPieces(headpieces);

        let backgroundLayer = await loadImage(
            path.resolve(`${imageDir}/Background/${backgroundName}_1.svg`)
        );
        let shellLayer = await loadImage(path.resolve(`${imageDir}/Shell/${shellName}_1.svg`));
        let legsLayer = await loadImage(path.resolve(`${imageDir}/Legs/${legsName}_1.svg`));
        let bodyLayer = await loadImage(path.resolve(`${imageDir}/Body/${bodyName}_1.svg`));
        let clawsLayer = await loadImage(path.resolve(`${imageDir}/Claws/${clawsName}_1.svg`));
        let headpiecesLayer = await loadImage(path.resolve(`${imageDir}/HeadPieces/${headpiecesName}_1.svg`));
        let shadowLayer = await loadImage(path.resolve(`${imageDir}/Services/shadow_1.svg`));

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

        await fs.writeFileSync(`${crabImage}`, combineLayer)
    }

    return `Anomuras/${crabId}.svg`;
};

const loadImage = async (pathToSvg) => {
    let crabImg = await tools.ImportSVG(pathToSvg);
    return crabImg.getBody();
};

const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));
