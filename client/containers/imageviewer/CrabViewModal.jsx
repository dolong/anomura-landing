import {
    Legendary,
    Rare,
    Magic,
    Normal,
    Nothing,
    BACKGROUND,
    CLAWS,
    BODY,
    HEADPIECES,
    SHELL,
    LEGS,
    getBody,
    getClaws,
    getShell,
    getLegs,
    getHeadPieces,
    getRarity,
    getBackground,
    getBackgroundRarity,
} from "@scripts/crabData";

import {
    bodyPartsData,
    habitatPartsData,
    clawsPartsData,
    shellPartsData,
    servicePartsData,
    headpiecesPartsData,
    legsPartsData,
} from "utils/";

import React, { useEffect } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";

export default function CrabViewModal({ data, setModalOpen }) {
    const { background, body, claws, legs, shell, headpieces } = data;
    const [hoverInfo, setHoverInfo] = React.useState({ name: "", src: "", type: "" });
    const [rarity, setRarity] = React.useState({
        bodyR: null,
        shellR: null,
        legsR: null,
        clawsR: null,
        headpiecesR: null,
        backgroundR: null,
    });

    React.useLayoutEffect(() => {
        let bodyR = getRarity(body);
        let shellR = getRarity(shell);
        let legsR = getRarity(legs);
        let clawsR = getRarity(claws);
        let headpiecesR = getRarity(headpieces);
        let backgroundR = getBackgroundRarity(background);

        setRarity((prevState) => ({
            ...prevState,
            bodyR,
            shellR,
            legsR,
            clawsR,
            headpiecesR,
            backgroundR,
        }));
    }, []);

    const ShowCard = (e) => {
        let cardRarity = null,
            cardImg = null,
            cardName = "",
            cardType,
            cardLabel;
        // console.log(e.target.id);
        switch (e) {
            case "shell":
                cardRarity = getRarity(shell);
                cardName = shell;
                cardType = SHELL;
                break;
            case "legs":
                cardRarity = getRarity(legs);
                cardName = legs;
                cardType = LEGS;
                break;
            case "body":
                cardRarity = getRarity(body);
                cardName = body;
                cardType = BODY;
                break;
            case "claws":
                cardRarity = getRarity(claws);
                cardName = claws;
                cardType = CLAWS;
                break;
            case "headpieces":
                cardRarity = getRarity(headpieces);
                if (headpieces === " " || headpieces === null || headpieces === undefined) {
                    cardName = "YOU HAVE NO HEADPIECE";
                } else {
                    cardName = headpieces;
                }
                cardType = HEADPIECES;
                break;
            case "background":
                cardRarity = getBackgroundRarity(background);
                cardName = background;
                cardType = BACKGROUND;
                break;
            default:
                // throw new Error("not a valid part");
                break;
        }
        cardImg = getCardImage(cardRarity);
        cardLabel = getCardLabel(cardRarity);
        let labelColor = getRarityLabelColor(cardRarity);

        setHoverInfo({
            rarity: cardRarity.description.toUpperCase(),
            name: cardName,
            src: cardImg,
            label: cardLabel,
            labelColor,
            type: cardType,
        });
    };

    const hideCard = () => {
        setHoverInfo({
            name: "",
            src: "",
            nameColor: "",
        });
    };
    const getCardImage = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/./img/imageviewer/Others/Card_Legendary.png";
            case Rare:
                return "/./img/imageviewer/Others/Card_Rare.png";
            case Magic:
                return "/./img/imageviewer/Others/Card_Magic.png";
            case Normal:
                return "/./img/imageviewer/Others/Card_Normal.png";
            case Nothing:
                return "/./img/imageviewer/Others/Card_Empty.png";
            default:
                return "/./img/imageviewer/Others/Card_Empty.png";
        }
    };
    const getRarityTextColor = (rarity) => {
        if (rarity == null || rarity == "") {
            return "";
        }
        switch (rarity) {
            case Legendary:
                return s.component_list_item_description_legend;
            case Rare:
                return s.component_list_item_description_rare;
            case Magic:
                return s.component_list_item_description_magic;
            case Normal:
                return s.component_list_item_description_normal;
            // case Normal:
            //         return s.component_list_item_description_normal;
            default:
                return s.component_list_item_description_normal;
        }
    };
    const getProperBackgroundName = (name) => {
        let bgArray = name.split("_");
        let first = capitalizeFirstLetter(bgArray[0]);
        let last = capitalizeFirstLetter(bgArray[1]);
        return first + " " + last;
    };
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const getHeadPiecesIcon = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/img/imageviewer/Others/Headpiece_legendary.png";
            case Rare:
                return "/img/imageviewer/Others/Headpiece_rare.png";
            case Magic:
                return "/img/imageviewer/Others/Headpiece_magic.png";
            case Normal:
                return "/img/imageviewer/Others/Headpiece_normal.png";
            default:
                return "/img/imageviewer/Others/Headpiece_empty.png";
        }
    };
    const getBodyIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Body_Legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Body_Rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Body_Magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Body_normal.png";
                default:
                    return "/img/imageviewer/Others/Body_normal.png";
            }
        }
        return "/img/imageviewer/Others/Body_normal.png";
    };
    const getClawsIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Claw_Legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Claw_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Claw_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Claw_normal.png";
                default:
                    return "/img/imageviewer/Others/Claw_normal.png";
            }
        }
        return "/img/imageviewer/Others/Claw_normal.png";
    };
    const getShellIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Shell_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Shell_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Shell_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Shell_normal.png";
                default:
                    return "/img/imageviewer/Others/Shell_normal.png";
            }
        }
        return "/img/imageviewer/Others/Shell_normal.png";
    };
    const getLegsIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Leg_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Leg_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Leg_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Leg_normal.png";
                default:
                    return "/img/imageviewer/Others/Leg_normal.png";
            }
        }
        return "/img/imageviewer/Others/Leg_normal.png";
    };
    const getBackgroundIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Land_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Land_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Land_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Land_normal.png";
                default:
                    return "/img/imageviewer/Others/Land_normal.png";
            }
        }
        return "/img/imageviewer/Others/Land_normal.png";
    };
    const getCardLabel = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/./img/imageviewer/Others/Rarity Label_Legendary.png";
            case Rare:
                return "/./img/imageviewer/Others/Rarity Label_Rare.png";
            case Magic:
                return "/./img/imageviewer/Others/Rarity Label_Magic.png";
            case Normal:
                return "/./img/imageviewer/Others/Rarity Label_Normal.png";
            case Nothing:
                return "/./img/imageviewer/Others/Rarity Label_Nothing.png";
            default:
                return "/./img/imageviewer/Others/Rarity Label_Nothing.png";
        }
    };
    const getRarityLabelColor = (rarity) => {
        switch (rarity) {
            case Legendary:
                return s.component_card_label_legend;
            case Rare:
                return s.component_card_label_rare;
            case Magic:
                return s.component_card_label_magic;
            case Normal:
                return s.component_card_label_normal;
            case Nothing:
                return s.component_card_label_nothing;
            default:
                return s.component_card_label_nothing;
        }
    };

    const renderCard = (hoverInfo) => {
        //imageSource = `/img/imageviewer/Shell/${shellName}_hex.png`;
        let imageStyle, imageSource;
        switch (hoverInfo.type) {
            case SHELL:
                let shellName = getShell(hoverInfo.name);
                imageSource = shellPartsData[shellName][24];
                imageStyle = s.component_card_hexagon_shell;
                break;
            case BODY:
                let bodyName = getBody(hoverInfo.name);
                imageSource = bodyPartsData[bodyName][24];
                imageStyle = s.component_card_hexagon_body;
                break;
            case CLAWS:
                let clawName = getClaws(hoverInfo.name);
                imageSource = clawsPartsData[clawName][24];
                imageStyle = s.component_card_hexagon_claws;
                break;
            case LEGS:
                let legsName = getLegs(hoverInfo.name);
                imageSource = legsPartsData[legsName][24];
                imageStyle = s.component_card_hexagon_legs;
                break;
            case HEADPIECES:
                if (hoverInfo.name === "YOU HAVE NO HEADPIECE") {
                    imageSource = "";
                } else {
                    let headPiecesName = getHeadPieces(hoverInfo.name);
                    imageSource = headpiecesPartsData[headPiecesName][24];
                }
                imageStyle = s.component_card_hexagon_headpieces;
                break;
            case BACKGROUND:
                let backgroundName = getBackground(hoverInfo.name);
                imageSource = habitatPartsData[backgroundName][23];
                imageStyle = s.component_card_hexagon_background;
                break;
            default:
                imageSource = "/img/imageviewer/Others/Land_normal.png";
                break;
        }
        return (
            <div className={s.component_card}>
                <div className={s.component_card_wrapper}>
                    {/* card image */}
                    <img src={hoverInfo.src} />
                    <div className={s.component_card_description}>
                        <div className={s.component_card_hexagon}>
                            {/* {hoverInfo.name !== "YOU HAVE NO HEADPIECE" && ( */}
                            <img
                                className={s.component_card_hexagon_greyLayer}
                                src="/img/imageviewer/Others/Grey background.png"
                            />
                            {/* )} */}
                            <img className={imageStyle} src={imageSource} />
                        </div>
                        <div className={s.component_card_name}>{hoverInfo.name}</div>
                        <div className={s.component_card_label}>
                            <img src={hoverInfo.label} />
                            <div
                                className={`${s.component_card_label_text} ${hoverInfo.labelColor}`}
                            >
                                {hoverInfo.rarity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center pointer-events-none">
                <div className={s.modal_container}>
                    <div className={s.component_zone}>
                        <div className={s.component_list}>
                            {/* Headpieces icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("headpieces")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getHeadPiecesIcon(rarity?.headpiecesR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.headpiecesR)} `}
                                >
                                    {rarity.headpiecesR !== Normal &&
                                        rarity.headpiecesR !== Nothing && (
                                            <span>{rarity.headpiecesR?.description} </span>
                                        )}
                                    <span>
                                        {rarity.headpiecesR === Nothing ? "No " : ""}
                                        Headpiece
                                    </span>
                                </div>
                            </div>
                            {/* Body Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("body")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getBodyIcon(rarity?.bodyR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.bodyR)}`}
                                >
                                    {/* {rarity.bodyR !== Normal && (
                                        <span>{rarity.bodyR?.description} </span>
                                    )}
                                    <span>Body</span> */}
                                    {body}
                                </div>
                            </div>
                            {/* Claws Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("claws")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getClawsIcon(rarity?.clawsR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.clawsR)}`}
                                >
                                    {/* {rarity.clawsR !== Normal && (
                                        <span>{rarity.clawsR?.description} </span>
                                    )} */}
                                    {/* <span></span> */}
                                    {claws}
                                </div>
                            </div>
                            {/* Shells Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("shell")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getShellIcon(rarity?.shellR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.shellR)}`}
                                >
                                    {/* {rarity.shellR !== "Normal" && (
                                        <span>{rarity.shellR?.description} </span>
                                    )}
                                    <span>Shell</span> */}
                                    {shell}
                                </div>
                            </div>
                            {/* Legs Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("legs")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getLegsIcon(rarity?.legsR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.legsR)}`}
                                >
                                    {/* {rarity.legsR !== Normal && (
                                        <span>{rarity.legsR?.description} </span>
                                    )}
                                    <span>Legs</span> */}
                                    {legs}
                                </div>
                            </div>
                            {/* Background Icon*/}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("background")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getBackgroundIcon(rarity?.backgroundR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${s.component_list_item_description}  
                                    ${getRarityTextColor(rarity.backgroundR)}
                                    `}
                                >
                                    {/* <span className="">{getProperBackgroundName(background)}</span> */}
                                    {background}
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        {hoverInfo.src !== "" && <>{renderCard(hoverInfo)}</>}
                    </div>
                </div>
                <div className={s.modal_overlay} onClick={() => setModalOpen(false)} />
            </div>
        </>
    );
}
