import {
    getShell,
    getHeadPieces,
    getRarity,
    Legend,
    Rare,
    Magic,
    Normal,
    CLAWS,
    BODY,
    HEADPIECES,
    SHELL,
    LEGS,
    getBody,
    getClaws,
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
    });
    // console.log(headpieces);
    // console.log(shell);
    React.useLayoutEffect(() => {
        let bodyR = getRarity(body);
        let shellR = getRarity(shell);
        let legsR = getRarity(legs);
        let clawsR = getRarity(claws);
        let headpiecesR = getRarity(headpieces);

        setRarity((prevState) => ({
            ...prevState,
            bodyR,
            shellR,
            legsR,
            clawsR,
            headpiecesR,
        }));
    }, []);

    const ShowCard = (e) => {
        let cardRarity = null,
            cardImg = null,
            cardName = "",
            cardType;

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
                // console.log(headpieces);
                cardRarity = getRarity(headpieces);
                cardName = headpieces;
                cardType = HEADPIECES;
                break;
            default:
                throw new Error("not a valid part");
        }

        cardImg = getCardImage(cardRarity);
        // console.log(cardRarity.description);
        setHoverInfo({
            rarity: cardRarity.description.toUpperCase(),
            name: cardName,
            src: cardImg,
            type: cardType,
            nameColor: "place holder text-red-500", // for info on the card
        });
    };
    // console.log(hoverInfo);
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
                return "/./img/imageviewer/Others/Card_WIP.png";
            case Rare:
                return "/./img/imageviewer/Others/Card_WIP.png";
            case Magic:
                return "/./img/imageviewer/Others/Card_WIP.png";
            case Normal:
                return "/./img/imageviewer/Others/Card_WIP.png";
            default:
                return "/./img/imageviewer/Others/Card_WIP.png";
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
        if (rarity) {
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
        }
        return "/img/imageviewer/Others/Headpiece_empty.png";
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

    const getImageWithinHexagon = (hoverInfo) => {
        console.log(hoverInfo);
        if (hoverInfo.type) {
            switch (hoverInfo.type) {
                case SHELL:
                    let shellName = getShell(hoverInfo.name);
                    // console.log(shellName);
                    return "/img/imageviewer/hex/starship_circle.jpg";
                case BODY:
                    let bodyName = getBody(hoverInfo.name);
                    return "/img/imageviewer/hex/snowbody_starbody_circle.jpg";
                case CLAWS:
                    let clawName = getClaws(hoverInfo.name);
                    return "/img/imageviewer/hex/woodclaw_pincers_circle.jpg";
                case LEGS:
                    return "/img/imageviewer/hex/metalleg_2_circle.jpg";
                case HEADPIECES:
                    let headPiecesName = getHeadPieces(hoverInfo.name);
                    console.log(headPiecesName);
                    return `/img/imageviewer/hex/crystal3_circle.jpg`;
                default:
                    return "/img/imageviewer/Others/Land_normal.png";
            }
        }
        return "/img/imageviewer/hex/crystal2-2_circle.jpg";
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
                                    {rarity.headpiecesR !== Normal && (
                                        <span>{rarity.headpiecesR?.description} </span>
                                    )}
                                    <span>Headpiece</span>
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
                                        onMouseLeave={hideCard}
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
                            <div id="background" className={s.component_list_item}>
                                <div className={s.component_list_item_icon}>
                                    <img
                                        className={s.component_list_item_icon_img}
                                        src={getBackgroundIcon()}
                                    />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    }  ${getRarityTextColor(rarity.legsR)}`}
                                >
                                    <span className="">{getProperBackgroundName(background)}</span>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                        {/* Card */}
                        {hoverInfo.src !== "" && (
                            <div className={s.component_card}>
                                <div className={s.component_card_wrapper}>
                                    <img src={hoverInfo.src} />
                                    <div className={s.component_card_description}>
                                        <div className={s.component_card_hexagon}>
                                            <img src="/img/imageviewer/Others/Hex border.png" />
                                            <img
                                                // className={s.component_right_card_zone_hexagon}
                                                // src="/img/imageviewer/hex/baseshell_2_circle.jpg"
                                                src={getImageWithinHexagon(hoverInfo)} //
                                            />
                                        </div>
                                        <div className={s.component_card_name}>
                                            {hoverInfo.name}
                                        </div>
                                        <div className={s.component_card_label}>
                                            <img src="/img/imageviewer/Others/card_label_legend.png" />
                                            <div className={s.component_card_label_text}>
                                                {hoverInfo.rarity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={s.modal_overlay} onClick={() => setModalOpen(false)} />
            </div>
        </>
    );
}
