import React, { useLayoutEffect, useEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import { TreasureChest } from "/containers/home/ContainerIndex";
import s from "/sass/home/home.module.css";

export default function WhenIsItOut({ ScrollPercent, audioSource, updateBackgroundSound }) {
    /*  position for extracting the whole page for mobile view on Creative Review board, will remove once everything is approved
        let calculatedOffsetY = useScrollValue(ScrollPercent, -6, 1300, -500, -150, -100, 5, 55);
    */
    const sectionRef = React.createRef();

    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 3460, -500, -150, -140, -130, 55);

    useLayoutEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sectionRef]);

    const handleScroll = () => {
        if (sectionRef.current) {
            var rect = sectionRef.current.getBoundingClientRect();
            if (rect.top < 0 && audioSource != "/audio/Underwater Loop Deep.wav") {
                updateBackgroundSound("/audio/Underwater Loop Deep.wav");
            }
            if (rect.top > 0 && audioSource != "/audio/UnderwaterLoop.wav") {
                updateBackgroundSound("/audio/UnderwaterLoop.wav");
            }
        }
    };

    return (
        <div
            className={s.when_zone}
            style={{ top: `calc(${calculatedOffsetY}px)` }}
            ref={sectionRef}
        >
            <div className={s.when_text}>
                <div>
                    <span className={s.when_highlight}>WHEN IS IT OUT?</span>
                </div>
                <p className={s.when_paragraph}>
                    Anomura is targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />A detailed road map will be available
                    shortly!
                </p>
            </div>
            <TreasureChest s={s}></TreasureChest>
        </div>
    );
}
