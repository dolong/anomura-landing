import React from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
import { randomIntFromInterval } from "../../utils/utils";
const InitialOffset = 1850,
    TwelveHundredOffSet = -200,
    OneThousandOffSet = -400,
    EightHundredOffSet = -250,
    SixHundredOffSet = -640,
    FourHundredOffSet = -750;

const anomuras = [
    "/img/home/anatomy/01.gif",
    "/img/home/anatomy/02.gif",
    "/img/home/anatomy/03.gif",
    "/img/home/anatomy/04.gif",
    "/img/home/anatomy/05.gif",
    "/img/home/anatomy/06.gif",
    "/img/home/anatomy/07.gif",
    "/img/home/anatomy/08.gif",
    "/img/home/anatomy/09.gif",
    "/img/home/anatomy/10.gif",
    "/img/home/anatomy/11.gif",
    "/img/home/anatomy/12.gif",
    "/img/home/anatomy/13.gif",
    "/img/home/anatomy/14.gif",
    "/img/home/anatomy/15.gif",
];

export default function CrabAnat({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-25);
    const [anomuraIndex, setAnomuraIndex] = React.useState(-1);
    const [tooltip, setShowTooltip] = React.useState({
        normal: false,
        magic: false,
        rare: false,
        legendary: false,
    });
    let timeout;

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        TwelveHundredOffSet,
        OneThousandOffSet,
        EightHundredOffSet,
        SixHundredOffSet,
        FourHundredOffSet
    );

    React.useLayoutEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-14);
        if (window.innerWidth <= 600) setScrollSpeed(-9);
    }, []);

    React.useEffect(() => {
        rerollAnomura();
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    const rerollAnomura = () => {
        let newIndex = -1;
        do {
            newIndex = randomIntFromInterval(0, 14);
        } while (newIndex == anomuraIndex);
        // console.log(`new index is: ${newIndex}`);

        setAnomuraIndex(newIndex);
    };
    const showNormalTooltip = () => {
        setShowTooltip({
            normal: !tooltip.normal,
            magic: false,
            rare: false,
            legendary: false,
        });
    };
    return (
        <div className={s.crab_anat} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.crab_container}>
                <div className={s.crab_heading}>ANOMURA ANATOMY</div>
                {/* <div className={s.crab_rarityPopup}></div> */}
                <div>
                    <p className={s.crab_paragraph}>
                        <div>
                            Each body part has a chance of being
                            <div className={s.crab_normal} onClick={() => showNormalTooltip()}>
                                {tooltip.normal && (
                                    <div className={s.crab_normal_popup}>
                                        <img src="/img/home/anatomy/popup-green.png" />
                                        <div className={s.crab_normal_popupText}>
                                            <span>Information for normal tier</span>
                                        </div>
                                    </div>
                                )}
                                normal
                            </div>
                            ,{" "}
                            <div
                                className={s.crab_magic}
                                onClick={() =>
                                    setShowTooltip({
                                        normal: false,
                                        magic: !tooltip.magic,
                                        rare: false,
                                        legendary: false,
                                    })
                                }
                            >
                                {tooltip.magic && (
                                    <div className={s.crab_magic_popup}>
                                        <img src="/img/home/anatomy/popup-purple.png" />
                                        <div className={s.crab_magic_popupText}>
                                            <span>11% - 1 Magical Prefix</span>
                                            <span>11% - 1 Magical Suffix</span>
                                            <span>22% - Magic item</span>
                                        </div>
                                    </div>
                                )}
                                magic
                            </div>
                            ,{" "}
                            <div
                                className={s.crab_rare}
                                onClick={() =>
                                    setShowTooltip({
                                        normal: false,
                                        magic: false,
                                        rare: !tooltip.rare,
                                        legendary: false,
                                    })
                                }
                            >
                                {tooltip.rare && (
                                    <div className={s.crab_rare_popup}>
                                        <img src="/img/home/anatomy/popup-blue.png" />
                                        <div className={s.crab_rare_popupText}>
                                            <span> 11% - Magical Prefix </span>
                                            <span>11% - Magical Suffix</span>
                                        </div>
                                    </div>
                                )}
                                rare
                            </div>
                            , or{" "}
                            <div
                                className={s.crab_legendary}
                                onClick={() =>
                                    setShowTooltip({
                                        normal: false,
                                        magic: false,
                                        rare: false,
                                        legendary: !tooltip.legendary,
                                    })
                                }
                            >
                                {tooltip.legendary && (
                                    <div className={s.crab_legendary_popup}>
                                        <img src="/img/home/anatomy/popup-orange.png" />
                                        <div className={s.crab_legendary_popupText}>
                                            <span> 2% - Legendary Prefix </span>
                                        </div>
                                    </div>
                                )}
                                legendary
                            </div>
                            .
                        </div>{" "}
                        {/* <div className={s.crab_normal_popup}>
                            <img src="/img/home/anatomy/popup-green.png" />
                        </div>
                         */}
                        {/* <div className={s.crab_magic}>
                            <div className={s.crab_magic_popup}>
                                <img src="/img/home/anatomy/popup-purple.png" />
                                <div className={s.crab_magic_popupText}>
                                    <span>11% - 1 Magical Prefix</span>
                                    <span>11% - 1 Magical Suffix</span>
                                    <span>22% - Magic item</span>
                                </div>
                            </div>
                            magic
                        </div> */}
                        {/* , <span className={s.crab_rare}>rare</span>, or{" "}
                        <span className={s.crab_legendary}>legendary</span>. */}
                    </p>
                </div>
                <div className={s.crab_reroll}>
                    <a onClick={rerollAnomura}>
                        <div>ROLL</div>
                        <img src="/img/home/anatomy/randomize button.png" alt="discord link" />
                    </a>
                </div>
                <div className={s.crab_frame}>
                    <div className={s.crab_frame_image}>
                        {anomuraIndex !== -1 && <img src={anomuras[anomuraIndex]} alt="anatomy" />}
                    </div>
                    {/* <img
                        className={s.crab_frame_image}
                        src="/img/home/anatomy/01.gif"
                        alt="anatomy"
                    /> */}
                    <img src="/img/home/anatomy/anatomy frame.png" alt="anatomy" />
                </div>
                {/* <div>
                    <span className={s.crab_normal}>CRAB ANATOMY!</span>
                    <div className={s.crab_inline}>
                        Each body part has a chance of being normal to legendary in rarity.
                    </div>
                </div>
                <br />

                <div className={s.crab_rarityContainer}>
                    <img
                        className={`${s.crab_bubble1}  `}
                        src="/img/home/bubbles_animated-export.gif"
                    />
                    {showBubble && (
                        <img
                            className={s.crab_bubble2}
                            src="/img/home/bubbles_animated-export2.gif"
                        />
                    )}
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_magical}>Magical Item</span>
                        </div>

                        <div className={s.crab_inline}>
                            11% - 1 Magical Prefix
                            <br />
                            11% - 1 Magical Suffix
                            <br />
                            ~22% chance of a magic item
                        </div>
                    </div>
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_rare}>Rare Item</span>
                        </div>
                        <div className={s.crab_inline}>
                            11% - Magical Prefix <br />
                            11% - Magical Suffix
                        </div>
                    </div>
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_legend}>Legendary Item</span>
                        </div>
                        <div className={s.crab_inline}>~2% - Legendary Item Prefix</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
