import React, { useState, useEffect } from "react";
import s from "/sass/home/shareFooter/index.module.css";
import Link from "next/link";

export default function ShareFooter({ audioControl }) {
    const [audioState, setAudioState] = useState("unloaded");
    const bubbleRef = React.createRef();
    let timeout, interval;

    React.useLayoutEffect(() => {
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
        if (audioControl?.bubble != null && bubbleRef.current && audioState == "unloaded") {
            setAudioState("loaded");

            timeout = setTimeout(() => {
                audioControl?.fishPass.playSound(0);
                interval = setInterval(() => {
                    audioControl?.fishPass.playSound(0);
                }, 4600);
            }, 2000);
        }
    }, [audioControl]);

    const changeAudioVolume = () => {
        if (bubbleRef.current && audioState == "loaded") {
            let rect = bubbleRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top);

            let fishVolume = 1 - reference / 800;
            if (fishVolume < 0.1 || !audioControl?.isSoundOn) {
                audioControl?.fishPass.setVolume(0);
            } else {
                {
                    audioControl?.fishPass.setVolume(fishVolume);
                }
            }
        }
    };

    return (
        <div className={s.shareFooter_zone}>
            <div className={s.shareFooter_icon}>
                <div className={s.shareFooter_icon_wrapper}>
                    <img src="/img/home/footer/logo-pink.png" />
                    <img src="/img/home/footer/Social_Hexagon Outline.png" />
                </div>
            </div>
            <div className={s.shareFooter_container}>
                <div className={s.shareFooter_followContainer} ref={bubbleRef}>
                    <p>
                        Let's stay in touch! Follow us and join the Cove to stay up-to-date with the
                        latest project and game updates.
                    </p>
                </div>

                <div className={s.shareFooter_socials}>
                    <div className={s.shareFooter_socials_wrapper}>
                        <div
                            className={s.shareFooter_socials_wrapper_icon}
                            onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")}
                        >
                            <img src="/img/home/footer/Social_Twitter.png" />
                            <img src="/img/home/footer/Social_Hexagon Outline.png" />
                        </div>
                        <div
                            className={s.shareFooter_socials_wrapper_icon}
                            onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")}
                        >
                            <img src="/img/home/footer/Social_Discord.png" />
                            <img src="/img/home/footer/Social_Hexagon Outline.png" />
                        </div>
                        <div
                            className={s.shareFooter_socials_wrapper_icon}
                            onClick={() => window.open(`https://medium.com/@anomura`, "_blank")}
                        >
                            <img src="/img/home/footer/Medium Icon.png" />
                            <img src="/img/home/footer/Social_Hexagon Outline.png" />
                        </div>
                        <div
                            className={s.shareFooter_socials_wrapper_icon}
                            onClick={() => window.open(`https://opensea.io/`, "_blank")}
                        >
                            <img src="/img/home/footer/Social_Opensea.png" />
                            <img src="/img/home/footer/Social_Hexagon Outline.png" />
                        </div>
                    </div>
                </div>
                <div className={s.shareFooter_chestAndFish}>
                    <ChestAndFish />
                </div>
                <div className={s.shareFooter_policy}>
                    <span className={s.shareFooter_policy_line}></span>
                    <div>
                        <Link href="/PrivacyPolicy.html">Privacy Policy</Link>
                        <Link href="/CCPANotice.html">CCPA Notice</Link>
                        <Link href="/TERMSANDCONDITIONS.html">Terms & Conditions</Link>
                    </div>
                </div>
                <div className={s.shareFooter_chestImage}>
                    <Chest />
                </div>
                <div className={s.shareFooter_fish}>
                    <Fish />
                </div>
            </div>
        </div>
    );
}

const Chest = () => {
    const renderCard = () => {
        return (
            <img
                className={`${s.shareFooter_chestImage_card}`}
                src="/img/home/cards/Card.webp"
                alt=""
            />
        );
    };
    const renderChest = () => {
        return (
            <img
                className={`${s.shareFooter_chestImage_chest}`}
                src="/img/home/footer/chest_only.gif"
                alt=""
            />
        );
    };
    const renderChestFloor = () => {
        return (
            <img
                className={`${s.shareFooter_chestImage_floor}`}
                src="/img/home/chests/chestfloor_modified.webp"
                alt=""
            />
        );
    };
    const renderChestLight = () => {
        return (
            <img
                className={`${s.shareFooter_chestImage_light}`}
                src="/img/home/chests/chest_open_lights_modified.webp"
                alt=""
            />
        );
    };
    return (
        <div className={s.shareFooter_chestImage_wrapper}>
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
                className={`${s.shareFooter_fish_fishImage}`}
                src="/img/home/footer/fish_only.gif"
                alt=""
            />
        );
    };

    return <div className={s.shareFooter_fish_wrapper}>{renderFish()}</div>;
};

const ChestAndFish = () => {
    return (
        <>
            <div className={s.shareFooter_chestAndFish_wrapper}>
                <div className={`${s.shareFooter_chestAndFish_chest}`}>
                    <img src="/img/home/footer/chest_only.gif" alt="" />
                    <img
                        className={`${s.shareFooter_chestImage_floor}`}
                        src="/img/home/chests/chestfloor_modified.webp"
                        alt=""
                    />
                    <img
                        className={`${s.shareFooter_chestImage_light}`}
                        src="/img/home/chests/chest_open_lights_modified.webp"
                        alt=""
                    />
                </div>

                <div className={`${s.shareFooter_chestAndFish_fishImage}`}>
                    <img src="/img/home/footer/fish_only.gif" alt="" />
                </div>
            </div>
        </>
    );
};
