import React, { useState, useEffect, useLayoutEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

const InitialOffset = 590,
    TwentyEightHundredOffset = 25,
    TwentyFiveHundredOffset = 25,
    NineteenHundredOffset = 25,
    SixteenHundredOffset = 25,
    TwelveHundredOffSet = 25,
    OneThousandOffSet = 50,
    EightHundredOffSet = 90,
    SixHundredOffSet = 100,
    FourHundredOffSet = 65;

export default function EnterInfinity({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-6.5);

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        TwentyEightHundredOffset,
        TwentyFiveHundredOffset,
        NineteenHundredOffset,
        SixteenHundredOffset,
        TwelveHundredOffSet,
        OneThousandOffSet,
        EightHundredOffSet,
        SixHundredOffSet,
        FourHundredOffSet
    );

    useLayoutEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-4.5);
        if (window.innerWidth <= 600) setScrollSpeed(-2);
    });

    return (
        <div className={s.enterInifinity} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.enterInifinity_container}>
                <div className={s.enterInifinity_text}>
                    <div className={s.enterInifinity_heading}>ENTER THE INFINITY CIRCLE</div>

                    <div className={s.enterInifinity_content}>
                        <div className={s.enterInifinity_content_picture}> </div>
                        <div className={s.enterInifinity_content_paragraph}>
                            <p>An ever-evolving Universe outside the vacuum of space and time.</p>
                            <p>
                                Play as an Anomura and journey to one of the five Realms: Ocean,
                                Earth, Science, or Sky.
                            </p>
                            <p>
                                An ever-evolving Universe outside the vacuum of space and time. Play
                                as an Anomura and journey to one of the five Realms: Ocean, Earth,
                                Science, or Sky. Battle aenemies & bosses who threaten your Realm.
                                Utilize the Infinity Circle by unlocking cards, gearing up, finding
                                treasure, and gaining XP.
                            </p>
                            <p>
                                Uncover the secrets of the Universe and restore balance to the four
                                Realms before it’s too late!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
