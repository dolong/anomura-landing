import {
    Legend,
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

        switch (e.target.id) {
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
                throw new Error("not a valid part");
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
            case Legend:
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
            case Legend:
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
            case Legend:
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
                case Legend:
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
                case Legend:
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
                case Legend:
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
                case Legend:
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
                case Legend:
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
            case Legend:
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
            case Legend:
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
        let imageStyle, imageSource;
        switch (hoverInfo.type) {
            case SHELL:
                let shellName = getShell(hoverInfo.name);
                imageSource = `/img/imageviewer/Shell/${shellName}_hex.png`;
                imageStyle = s.component_card_hexagon_shell;
                break;
            case BODY:
                let bodyName = getBody(hoverInfo.name);
                imageSource = `/img/imageviewer/Body/${bodyName}_hex.png`;
                imageStyle = s.component_card_hexagon_body;
                break;
            case CLAWS:
                let clawName = getClaws(hoverInfo.name);
                imageSource = `/img/imageviewer/Claws/${clawName}_hex.png`;
                imageStyle = s.component_card_hexagon_claws;
                break;
            case LEGS:
                let legsName = getLegs(hoverInfo.name);
                imageSource = `/img/imageviewer/Legs/${legsName}_hex.png`;
                imageStyle = s.component_card_hexagon_legs;
                break;
            case HEADPIECES:
                if (hoverInfo.name === "YOU HAVE NO HEADPIECE") {
                    imageSource = "";
                } else {
                    let headPiecesName = getHeadPieces(hoverInfo.name);
                    imageSource = `/img/imageviewer/HeadPieces/${headPiecesName}_hex.png`;
                }
                imageStyle = s.component_card_hexagon_headpieces;
                break;
            case BACKGROUND:
                let backgroundName = getBackground(hoverInfo.name);
                imageSource = `/img/imageviewer/Background/${backgroundName}_1.png`;
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
                            {hoverInfo.name !== "YOU HAVE NO HEADPIECE" && (
                                <img
                                    className={s.component_card_hexagon_greyLayer}
                                    src="/img/imageviewer/Others/Grey background.png"
                                />
                            )}
                            <img
                                className={imageStyle}
                                src={imageSource} //
                            />
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
                        {/* <div className={s.component_left}> */}
                        <div className={s.component_list}>
                            {/* Headpieces icon */}
                            <div className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="headpieces"
                                        className={s.component_list_item_icon_img}
                                        src={getHeadPiecesIcon(rarity?.headpiecesR)}
                                        onMouseEnter={ShowCard}
                                        onMouseLeave={hideCard}
                                    />
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
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="body"
                                        className={s.component_list_item_icon_img}
                                        src={getBodyIcon(rarity?.bodyR)}
                                        onMouseEnter={ShowCard}
                                        onMouseLeave={hideCard}
                                    />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.bodyR)}`}
                                >
                                    {rarity.bodyR !== Normal && (
                                        <span>{rarity.bodyR?.description} </span>
                                    )}
                                    <span>Body</span>
                                </div>
                            </div>
                            {/* Claws Icon */}
                            <div className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="claws"
                                        className={s.component_list_item_icon_img}
                                        src={getClawsIcon(rarity?.clawsR)}
                                        onMouseEnter={ShowCard}
                                        onMouseLeave={hideCard}
                                    />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.clawsR)}`}
                                >
                                    {rarity.clawsR !== Normal && (
                                        <span>{rarity.clawsR?.description} </span>
                                    )}
                                    <span>Claws</span>
                                </div>
                            </div>
                            {/* Shells Icon */}
                            <div className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="shell"
                                        className={s.component_list_item_icon_img}
                                        src={getShellIcon(rarity?.shellR)}
                                        onMouseEnter={ShowCard}
                                        // onMouseLeave={hideCard}
                                    />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.shellR)}`}
                                >
                                    {rarity.shellR !== "Normal" && (
                                        <span>{rarity.shellR?.description} </span>
                                    )}

                                    <span>Shell</span>
                                </div>
                            </div>
                            {/* Legs Icon */}
                            <div className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="legs"
                                        className={s.component_list_item_icon_img}
                                        src={getLegsIcon(rarity?.legsR)}
                                        onMouseEnter={ShowCard}
                                        onMouseLeave={hideCard}
                                    />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.legsR)}`}
                                >
                                    {rarity.legsR !== Normal && (
                                        <span>{rarity.legsR?.description} </span>
                                    )}
                                    <span>Legs</span>
                                </div>
                            </div>
                            {/* Background Icon*/}
                            <div className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        id="background"
                                        className={s.component_list_item_icon_img}
                                        src={getBackgroundIcon(rarity?.backgroundR)}
                                        onMouseEnter={ShowCard}
                                        onMouseLeave={hideCard}
                                    />
                                </div>
                                <div
                                    className={`${s.component_list_item_description}  
                                    ${getRarityTextColor(rarity.backgroundR)}
                                    `}
                                >
                                    <span className="">{getProperBackgroundName(background)}</span>
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
