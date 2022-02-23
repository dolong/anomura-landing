import { getBody, getClaws, getShell, getLegs, getBackground, getHeadPieces } from "utils/crabData";
import fs from "fs";
import path from "path";
const tools = require("simple-svg-tools");
import getConfig from "next/config";
//import { svg2png } from "svg-png-converter";
//let FormData = require('form-data');

const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

// merge images svg, return the location of the image, based on id
export const CrabImagesBuilder = async (crab) => {
    const { crabId, background, body, legs, claws, shell, headpieces } = crab;
    const dirRelativeToPublicFolder = "img/imageviewer";
    // const imageDir = path.join(
    //     getConfig().serverRuntimeConfig.PROJECT_ROOT,
    //     "./public/" + dirRelativeToPublicFolder
    // );

    const imageDir = path.join(
        process.cwd(),
        "./public/" + dirRelativeToPublicFolder
    );
    const fileName = `Anomura_${crabId}`;
    const crabImage = `${imageDir}\\Anomuras\\${crabId}.svg`;

    console.log(crabImage)
    let isFileExist = await fileExists(crabImage);

    if (isFileExist) {
        console.log("crab image already existed, overwritten the image");
    } else {
        console.log("crab image not exists, building new image");
    }

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
    let headpiecesLayer = await loadImage(
        path.resolve(`${imageDir}/HeadPieces/${headpiecesName}_1.svg`)
    );
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

    // let base64String = await svg2png({
    //     input: combineLayer.trim(),
    //     encoding: "dataURL",
    //     format: "png",
    //     width: 384,
    //     height: 384,
    // });

    // const formData = new FormData();
    // formData.append("file", base64String);
    // formData.append("api_key", "558526949884865");
    // formData.append("api_secret", "0Yp8Ix2TWtf3x-3vRoNpXfmcHfY");
    // formData.append("upload_preset", "worldwatch");
    // formData.append("public_id", fileName);

    const url = "https://api.cloudinary.com/v1_1/worldwatch/image/upload";

    // fetch(url, {
    //     method: "POST",
    //     body: formData
    //   }).then((response) => {
    //     return response.text();
    // })
    // .then((data) => {
    //     let result = JSON.parse(data);
    //     console.log()
    //     return result.secure_url;

    // }).catch(err => {
    //     throw new Error(err)
    // });

    await fs.writeFileSync(`${crabImage}`, combineLayer);
    return `Anomuras/${crabId}.svg`;
};

const loadImage = async (pathToSvg) => {
    let crabImg = await tools.ImportSVG(pathToSvg);
    return crabImg.getBody();
};

const fileExists = async (path) => !!(await fs.promises.stat(path).catch((e) => false));
