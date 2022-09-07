import React, { useState, useEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
import Link from "next/link";

const InitialOffset = 6000,
    ThirtyEightHundredOffset = 3000,
    TwentyEightHundredOffset = 1700,
    TwentyFiveHundredOffset = 1350,
    NineteenHundredOffset = -200,
    SixteenHundredOffset = -350,
    TwelveHundredOffSet = 200,
    OneThousandOffSet = 20,
    EightHundredOffSet = -40,
    SixHundredOffSet = 100, // 700
    FourHundredOffSet = 0;

export default function Footer({ ScrollPercent, audioControl }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-45);
    const [audioState, setAudioState] = useState("unloaded");
    const bubbleRef = React.createRef();
    let timeout, interval;

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        ThirtyEightHundredOffset,
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

    React.useLayoutEffect(() => {
        if (window.innerWidth <= 1750 && window.innerWidth >= 1600) setScrollSpeed(-55);
        if (window.innerWidth <= 1200) setScrollSpeed(-27);
        if (window.innerWidth <= 600) setScrollSpeed(-12);
        if (window.innerWidth <= 375) setScrollSpeed(-12);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", changeAudioVolume);
        return () => {
            window.removeEventListener("scroll", changeAudioVolume);
        };
    }, [bubbleRef]);

    useEffect(() => {
        changeAudioVolume();
        if (audioControl.bubble != null && bubbleRef.current && audioState == "unloaded") {
            setAudioState("loaded");

            timeout = setTimeout(() => {
                audioControl.fishPass.playSound(0);
                interval = setInterval(() => {
                    audioControl.fishPass.playSound(0);
                }, 4600);
            }, 2000);
        }
    }, [audioControl]);

    const changeAudioVolume = () => {
        if (bubbleRef.current && audioState == "loaded") {
            let rect = bubbleRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top);

            let fishVolume = 1 - reference / 800;
            if (fishVolume < 0.1 || !audioControl.isSoundOn) {
                audioControl.fishPass.setVolume(0);
            } else {
                {
                    audioControl.fishPass.setVolume(fishVolume);
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
                        href="https://medium.com/@anomura"
                        target="_blank"
                        className={s.footer_medium}
                    >
                        <img src="/img/home/footer/Medium Button.png" alt="medium link" />
                        <div>
                            <span>Medium</span>
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
                    <p>Backed by</p>
                </div>

                <div className={s.footer_logo}>
                    <img src="/img/home/footer/vhs logo trim.png" alt="" />
                </div>

                <div className={s.footer_mission}>
                    <p>
                        Virtually Human’s mission is to uncover what the future of entertainment can
                        do for humanity. Their flagship game ZED RUN is one of the first of its kind
                        created on the blockchain.
                    </p>
                    <img className={s.footer_bubble2} src="/img/home/footer/bubbles.gif" />
                </div>
                <div className={s.footer_chestAndFish}>
                    <ChestAndFish />
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
                <div className={s.footer_fish}>
                    <Fish />
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
                src="/img/home/footer/chest_only.gif"
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

const Fish = () => {
    const renderFish = () => {
        return (
            <img
                className={`${s.footer_fish_fishImage}`}
                src="/img/home/footer/fish_only.gif"
                alt=""
            />
        );
    };

    return <div className={s.footer_fish_wrapper}>{renderFish()}</div>;
};

const ChestAndFish = () => {
    return (
        <>
            <div className={s.footer_chestAndFish_wrapper}>
                <div className={`${s.footer_chestAndFish_chest}`}>
                    <img src="/img/home/footer/chest_only.gif" alt="" />
                    <img
                        className={`${s.footer_chestImage_floor}`}
                        src="/img/home/chests/chestfloor_modified.webp"
                        alt=""
                    />
                    <img
                        className={`${s.footer_chestImage_light}`}
                        src="/img/home/chests/chest_open_lights_modified.webp"
                        alt=""
                    />
                </div>

                <div className={`${s.footer_chestAndFish_fishImage}`}>
                    <img src="/img/home/footer/fish_only.gif" alt="" />
                </div>
            </div>
        </>
    );
};
