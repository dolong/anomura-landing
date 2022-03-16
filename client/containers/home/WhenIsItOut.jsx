import React from "react";
import { useScrollValue } from "/lib/useScrollValue";
import { TreasureChest } from "/containers/home/ContainerIndex";
import s from "/sass/home/home.module.css";

const InitialOffset = 4300,
    TwelveHundredOffSet = -800,
    OneThousandOffSet = -1100,
    EightHundredOffSet = -950,
    SixHundredOffSet = -750,
    FourHundredOffSet = -700;

export default function WhenIsItOut({ ScrollPercent, audioControl }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-55);
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
        if (window.innerWidth <= 1200) setScrollSpeed(-20);
        if (window.innerWidth <= 600) setScrollSpeed(-18);
    }, []);

    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_container}>
                <div className={s.when_text}>
                    <div className={s.when_heading}>LAUNCH ROADMAP</div>
                    <div className={s.when_paragraphContainer}>
                        <p>Stay tuned for a more detailed roadmap.</p>
                    </div>
                </div>
                <div className={s.when_roadmap}>
                    <div className={`${s.when_roadmap_details}  `}>
                        <div className={`${s.when_roadmap_imgContainer}  `}>
                            <img
                                className={`${s.when_roadmap_imgContainer_image}  `}
                                src="/img/home/whenSection/bowlx5.gif"
                            />

                            <img
                                className={s.when_roadmap_trail1}
                                src="/img/home/whenSection/Roadmap trail.png"
                            />
                        </div>

                        <div className={`${s.when_roadmap_text}  `}>
                            <span>COMING SOON</span>
                            <span>Mystery Bowl NFT Drop</span>
                        </div>
                    </div>
                    <div className={`${s.when_roadmap_details}  `}>
                        <div className={`${s.when_roadmap_imgContainer}  `}>
                            <img
                                className={`${s.when_roadmap_imgContainer_anomura}  `}
                                src="/img/home/whenSection/Roadmap anomura.gif"
                            />
                            <img
                                className={s.when_roadmap_trail2}
                                src="/img/home/whenSection/Roadmap trail.png"
                            />
                        </div>
                        <div className={`${s.when_roadmap_text}  `}>
                            <span>COMING SOON</span>
                            <span>Anomura Hatching Day</span>
                        </div>
                    </div>
                    <div className={`${s.when_roadmap_details}  `}>
                        <div className={`${s.when_roadmap_imgContainer}  `}>
                            <img
                                className={`${s.when_roadmap_imgContainer_image}  `}
                                src="/img/home/whenSection/pink crystals.png"
                            />
                        </div>

                        <div className={`${s.when_roadmap_text}  `}>
                            <span>TBA</span>
                            <span>More to come!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
