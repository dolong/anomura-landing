import React, { useState, useEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

export default function NFT({ ScrollPercent, audioControl }) {
    //original
    let calculatedOffsetY = useScrollValue(ScrollPercent, -6.5, 700, -125, -145, -70, -80, -90);

    //let calculatedOffsetY = useScrollValue(ScrollPercent, -4.5, 700, -125, -145, -100, -190, -90);

    const nftRef = React.createRef();
    const [audioState, setAudioState] = useState("unloaded");
    const [showBubble, setshowBubble] = useState(false);
    let timeout;

    useEffect(() => {
        timeout = setTimeout(() => {
            setshowBubble(true);
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        if (audioControl.chestChime != null && audioState == "unloaded") {
            setAudioState("loaded");
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [audioControl, nftRef]);

    const handleScroll = () => {
        if (nftRef.current && audioState == "loaded") {
            let rect = nftRef.current.getBoundingClientRect();
            console.log(rect.top);
            let reference = Math.abs(rect.top) + 200;

            let bubbleVolume = 0.5 - reference / 1500;
            if (bubbleVolume < 0.01) {
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
            <div className={s.nft_text}>
                <img className={`${s.nft_bubble1}  `} src="/img/home/bubbles_animated-export.gif" />
                {showBubble && (
                    <img className={s.nft_bubble2} src="/img/home/bubbles_animated-export2.gif" />
                )}

                <div>
                    <span className={s.nft_heading}>NFT x VIDEOGAME!</span>
                    <p className={s.nft_paragraph}>Anomuras are the protectors of the earth.</p>
                    <p className={s.nft_paragraph}>
                        <span className="font-bold"> 10,000</span> original Anomuras with unique
                        traits and habitats will be crafted to be minted.
                    </p>
                    <p className={s.nft_paragraph}>
                        Your Anomura NFT will be your{" "}
                        <span className="font-bold"> exclusive pass</span> to gain early access to
                        the game, reap rewards and participate in events.
                    </p>
                </div>
            </div>
        </div>
    );
}
