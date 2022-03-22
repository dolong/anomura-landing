import React from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
import { randomIntFromInterval } from "../../utils/utils";

const InitialOffset = 1950,
    SixteenHundredOffset = -220,
    TwelveHundredOffSet = -100,
    OneThousandOffSet = -250,
    EightHundredOffSet = -250,
    SixHundredOffSet = -190,
    FourHundredOffSet = -250;

const anomuras = [
    "/img/home/anatomy/01.webp",
    "/img/home/anatomy/02.webp",
    "/img/home/anatomy/03.webp",
    "/img/home/anatomy/04.webp",
    "/img/home/anatomy/05.webp",
    "/img/home/anatomy/06.webp",
    "/img/home/anatomy/07.webp",
    "/img/home/anatomy/08.webp",
    "/img/home/anatomy/09.webp",
    "/img/home/anatomy/10.webp",
    "/img/home/anatomy/11.webp",
    "/img/home/anatomy/12.webp",
    "/img/home/anatomy/13.webp",
    "/img/home/anatomy/14.webp",
    "/img/home/anatomy/15.webp",
];

export default function CrabAnat({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-25);
    const [anomuraIndex, setAnomuraIndex] = React.useState(-1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [tooltip, setShowTooltip] = React.useState({
        normal: false,
        magic: false,
        rare: false,
        legendary: false,
    });

    const [imageSource, setImageSource] = React.useState({
        currentImage: 0,
        images: [
            "/img/home/anatomy/01.png",
            "/img/home/anatomy/02.png",
            "/img/home/anatomy/03.png",
            "/img/home/anatomy/04.png",
            "/img/home/anatomy/05.png",
            "/img/home/anatomy/06.png",
            "/img/home/anatomy/07.png",
            "/img/home/anatomy/08.png",
            "/img/home/anatomy/09.png",
            "/img/home/anatomy/10.png",
            "/img/home/anatomy/11.png",
            "/img/home/anatomy/12.png",
            "/img/home/anatomy/13.png",
            "/img/home/anatomy/14.png",
            "/img/home/anatomy/15.png",
        ],
    });
    let timeout;

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        SixteenHundredOffset,
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
        let newIndex = randomIntFromInterval(0, 14);
        setAnomuraIndex(newIndex);

        preloadImages();
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const rerollAnomura = () => {
        if (isLoading) return;

        setIsLoading(true);

        let counter = 0;
        let imageInterval = setInterval(function () {
            setImageSource((prevState) => ({
                ...prevState,
                currentImage: randomIntFromInterval(0, 14),
            }));
            if (counter <= 14) {
                counter++;
            } else {
                clearInterval(imageInterval);
                setIsLoading(false);
            }
        }, 100);

        let newIndex = -1;
        do {
            newIndex = randomIntFromInterval(0, 14);
        } while (newIndex == anomuraIndex);

        setAnomuraIndex(newIndex);
    };

    const preloadImages = () => {
        imageSource.images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });

        // those are heavy
        new Image().src = "/img/home/anatomy/03.webp";
        new Image().src = "/img/home/anatomy/06.webp";
        new Image().src = "/img/home/anatomy/07.webp";
        new Image().src = "/img/home/anatomy/09.webp";
        new Image().src = "/img/home/anatomy/12.webp";
        new Image().src = "/img/home/anatomy/14.webp";
    };

    return (
        <div className={s.crab_anat} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.crab_container}>
                <div className={s.crab_heading}>ANOMURA ANATOMY</div>

                <div className={s.crab_paragraphContainer}>
                    Each body part has a chance of being
                    <div
                        className={s.crab_normal}
                        onMouseEnter={() =>
                            setShowTooltip({
                                normal: !tooltip.normal,
                                magic: false,
                                rare: false,
                                legendary: false,
                            })
                        }
                        onMouseLeave={() =>
                            setShowTooltip({
                                normal: !tooltip.normal,
                                magic: false,
                                rare: false,
                                legendary: false,
                            })
                        }
                    >
                        {tooltip.normal && (
                            <div className={s.crab_normal_popup}>
                                <img src="/img/home/anatomy/popup-green.png" />
                                <div className={s.crab_normal_popupText}>
                                    <div>
                                        <span>Information for normal tier</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <span className="ml-2"></span> normal
                    </div>
                    ,{" "}
                    <div
                        className={s.crab_magic}
                        onMouseEnter={() =>
                            setShowTooltip({
                                normal: false,
                                magic: !tooltip.magic,
                                rare: false,
                                legendary: false,
                            })
                        }
                        onMouseLeave={() =>
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
                                    <div>
                                        <span>11% - 1 Magical Prefix</span>
                                        <span>11% - 1 Magical Suffix</span>
                                        <span>22% - Magic item</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        magic
                    </div>
                    ,{" "}
                    <div
                        className={s.crab_rare}
                        onMouseEnter={() =>
                            setShowTooltip({
                                normal: false,
                                magic: false,
                                rare: !tooltip.rare,
                                legendary: false,
                            })
                        }
                        onMouseLeave={() =>
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
                                    <div>
                                        <span> 11% - Magical Prefix </span>
                                        <span>11% - Magical Suffix</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        rare
                    </div>
                    , or{" "}
                    <div
                        className={s.crab_legendary}
                        onMouseEnter={() =>
                            setShowTooltip({
                                normal: false,
                                magic: false,
                                rare: false,
                                legendary: !tooltip.legendary,
                            })
                        }
                        onMouseLeave={() =>
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
                                    <div>
                                        <span> 2% - Legendary Prefix </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        legendary
                    </div>
                </div>
                {/* </div> */}
                <div className={s.crab_reroll}>
                    <a onClick={rerollAnomura}>
                        <div>
                            <span>ROLL</span>
                        </div>
                        <img src="/img/home/anatomy/randomize button_dice.png" alt="discord link" />
                    </a>
                </div>
                <div className={s.crab_frame}>
                    {!isLoading && (
                        <div className={s.crab_frame_image}>
                            {anomuraIndex !== -1 && (
                                <img src={anomuras[anomuraIndex]} alt="anatomy" />
                            )}
                        </div>
                    )}
                    {isLoading && (
                        <div className={s.crab_frame_image}>
                            <img src={imageSource.images[imageSource.currentImage]} alt="anatomy" />
                        </div>
                    )}

                    <img src="/img/home/anatomy/anatomy frame.png" alt="frame" />
                </div>
            </div>
        </div>
    );
}
