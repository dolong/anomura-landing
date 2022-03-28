import React, { useState, useEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
import Link from "next/link";

const InitialOffset = 5600,
    SixteenHundredOffset = -700,
    TwelveHundredOffSet = -1000,
    OneThousandOffSet = -1250,
    EightHundredOffSet = -1050,
    SixHundredOffSet = -920,
    FourHundredOffSet = -900;

export default function Footer({ ScrollPercent, audioControl }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-55);
    const [audioState, setAudioState] = useState("unloaded");
    const bubbleRef = React.createRef();

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
        if (window.innerWidth <= 1200) setScrollSpeed(-25);
        if (window.innerWidth <= 600) setScrollSpeed(-22);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", changeAudioVolume);
        return () => {
            window.removeEventListener("scroll", changeAudioVolume);
        };
    }, [bubbleRef]);

    useEffect(() => {
        changeAudioVolume();
        if (audioControl.chestChime != null && audioState == "unloaded") {
            setAudioState("loaded");
        }
        return () => {};
    }, [audioControl]);

    const changeAudioVolume = () => {
        if (bubbleRef.current && audioState == "loaded") {
            let rect = bubbleRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top);

            let bubbleVolume = 0.5 - reference / 2200;
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
        <div className={s.footer_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.footer_container}>
                <div className={s.footer_follow}>
                    <img src="/img/home/footer/Follow Us.png" alt="Follow Us" />
                    <img className={s.footer_bubble1} src="/img/home/footer/bubbles.gif" />
                </div>

                <div className={s.footer_followContainer} ref={bubbleRef}>
                    <p>
                        Join our community and follow us for the latest updates and upcoming events.
                    </p>
                </div>
                <div className={s.footer_buttons}>
                    <a
                        href="https://discord.gg/anomuragame"
                        target="_blank"
                        className={s.footer_discord}
                    >
                        <div>
                            <span>Discord</span>
                        </div>
                        <img src="/img/home/footer/Discord Button.png" alt="discord link" />
                    </a>
                    <a
                        href="https://instagram.com/anomuragame"
                        target="_blank"
                        className={s.footer_instagram}
                    >
                        <img src="/img/home/footer/Instagram Button.png" alt="instagram link" />
                        <div>
                            <span>Instagram</span>
                        </div>
                    </a>
                    <a
                        href="https://twitter.com/anomuragame"
                        target="_blank"
                        className={s.footer_twitter}
                    >
                        <img src="/img/home/footer/Twitter Button.png" alt="twitter link" />
                        <div>
                            <span>Twitter</span>
                        </div>
                    </a>
                </div>
                <div className={s.footer_anomura}>
                    <img src="/img/home/footer/logo-pink.png" alt="AnomuraLogo" />
                </div>

                <div className={s.footer_presented}>
                    <p>Presented by</p>
                </div>

                <div className={s.footer_logo}>
                    <img src="/img/home/footer/vhs logo trim.png" alt="" />
                </div>

                <div className={s.footer_mission}>
                    <p>
                        Virtually Human’s mission is to uncover what the future of entertainment can
                        do for humanity. Their flagship game ZED RUN is one of the first of its kind
                        created on the blockchain and is one of the leading NFT games built on
                        Ethereum globally.
                    </p>
                    <img className={s.footer_bubble2} src="/img/home/footer/bubbles.gif" />
                </div>
                <div className={s.footer_policy}>
                    <span className={s.footer_policy_line}></span>
                    <div>
                        <Link href="/PrivacyPolicy.html">Privacy Policy</Link>
                        <Link href="/CCPANotice.html">CCPA Notice</Link>
                        <Link href="/TERMSANDCONDITIONS.html">Terms & Conditions</Link>
                    </div>
                </div>
                <div className={s.footer_chestImage}>
                    <Chest />
                </div>
            </div>
        </div>
    );
}

const Chest = () => {
    const renderCard = () => {
        return (
            <img className={`${s.footer_chestImage_card}`} src="/img/home/cards/Card.webp" alt="" />
        );
    };
    const renderChest = () => {
        return (
            <img
                className={`${s.footer_chestImage_chest}`}
                src="/img/home/chests/chest_opened_175f.gif"
                alt=""
            />
        );
    };

    const renderChestFloor = () => {
        return (
            <img
                className={`${s.footer_chestImage_floor}`}
                src="/img/home/chests/chestfloor_modified.webp"
                alt=""
            />
        );
    };

    const renderChestLight = () => {
        return (
            <img
                className={`${s.footer_chestImage_light}`}
                src="/img/home/chests/chest_open_lights_modified.webp"
                alt=""
            />
        );
    };
    return (
        <div className={s.footer_chestImage_wrapper}>
            {/* {renderCard()} */}
            {renderChestFloor()}
            {renderChest()}
            {renderChestLight()}
        </div>
    );
};
