import React, { useState, useEffect, useLayoutEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

const InitialOffset = 600,
    SixteenHundredOffset = 25,
    TwelveHundredOffSet = 25,
    OneThousandOffSet = 50,
    EightHundredOffSet = 90,
    SixHundredOffSet = 40,
    FourHundredOffSet = 10;

export default function NFT({ ScrollPercent, audioControl }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-6.5);

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

    const nftRef = React.createRef();
    const [audioState, setAudioState] = useState("unloaded");

    useLayoutEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-4.5);
        if (window.innerWidth <= 600) setScrollSpeed(-2.5);
    });

    useEffect(() => {
        window.addEventListener("scroll", changeAudioVolume);
        return () => {
            window.removeEventListener("scroll", changeAudioVolume);
        };
    }, [nftRef]);

    useEffect(() => {
        changeAudioVolume();
        if (audioControl.chestChime != null && audioState == "unloaded") {
            setAudioState("loaded");
        }
        return () => {};
    }, [audioControl]);

    const changeAudioVolume = () => {
        if (nftRef.current && audioState == "loaded") {
            let rect = nftRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top) + 200;

            let bubbleVolume = 0.5 - reference / 1500;
            if (bubbleVolume < 0.01 || !audioControl.isSoundOn) {
                audioControl.bubble.setVolume(0);
            } else {
                {
                    audioControl.bubble.setVolume(bubbleVolume);
                }
            }
        }
    };

    return (
        <div className={s.nft} style={{ top: `calc(${calculatedOffsetY}px)` }} ref={nftRef}>
            <div className={s.nft_container}>
                <div className={s.nft_text}>
                    <div className={`${s.nft_star2Container}`}>
                        <img
                            className={`${s.nft_star} ${s.nft_star2}`}
                            src="/img/home/starfish01.gif"
                        />
                    </div>

                    <div>
                        <div className={s.nft_heading}>NFT X VIDEOGAME!</div>
                        <div className={s.nft_paragraphContainer}>
                            <p>
                                Anomuras are sworn protectors of the Earth and all realms in the
                                Infinity Circle.
                            </p>
                            <p>Mint original Anomuras, each with unique traits and habitats.</p>
                            <p>
                                Gain exclusive access to the game using your Anomura NFT, reap
                                rewards, participate in events, and more.
                            </p>
                        </div>
                    </div>
                    <div className={`${s.nft_star1Container}`}>
                        <img
                            className={`${s.nft_star} ${s.nft_star1}  `}
                            src="/img/home/starfish01.gif"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
