import React, { useState, useEffect } from "react";
import s from "/sass/home/home.module.css";

export default function TreasureChest({ audioControl }) {
    const [chestState, setChestState] = useState("idle");
    const treasureRef = React.createRef();
    const [audioState, setAudioState] = useState("unloaded");

    let timeout, interval;

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
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
    }, [audioControl, treasureRef]);

    const handleScroll = () => {
        if (treasureRef.current && audioState == "loaded") {
            let rect = treasureRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top);

            if (chestState !== "opened") {
                let chimeVolume = 0.1 - reference / 8000;
                if (chimeVolume < 0.001) {
                    audioControl.chestChime.setVolume(0);
                } else {
                    {
                        audioControl.chestChime.setVolume(chimeVolume);
                    }
                }
            }

            let fishVolume = 1 - reference / 800; // no fish sound around footer
            if (fishVolume < 0.1) {
                audioControl.fishPass.setVolume(0);
            } else {
                {
                    audioControl.fishPass.setVolume(fishVolume);
                }
            }
        }
    };

    const OpenChest = async () => {
        if (chestState === "idle") {
            setChestState("opening");
            setTimeout(() => {
                setChestState("opened");
            }, 800);
        }

        if (audioControl.chestChime) {
            audioControl.chestChime.stop();
        }

        if (audioControl.chestOpen) {
            audioControl.chestOpen.playSound();
        }

        timeout = setTimeout(() => {
            audioControl.fishPass.playSound();
            interval = setInterval(() => {
                audioControl.fishPass.playSound();
            }, 4400);
        }, 2200);
    };

    return (
        <div className={s.treasure_zone} ref={treasureRef}>
            <div className={s.treasure_image}>
                {chestState === "opening" && (
                    <>
                        <img
                            className={`${s.treasure_card} invisible`}
                            src="/img/home/cards/Card.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chests/chestfloor_modified.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chest}`}
                            src="/img/home/chests/chest_opening_135f.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chests/chest_idle_lights_modified.webp"
                            alt=""
                        />
                    </>
                )}
                {chestState === "opened" && (
                    <>
                        <img
                            className={`${s.treasure_card}`}
                            src="/img/home/cards/Card.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chests/chestfloor_modified.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chest}`}
                            src="/img/home/chests/chest_opened_175f.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chests/chest_open_lights_modified.webp"
                            alt=""
                        />
                    </>
                )}
                {chestState === "idle" && (
                    <>
                        <img
                            className={`${s.treasure_card} invisible`}
                            src="/img/home/cards/Card.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chests/chestfloor_modified.webp"
                            alt=""
                        />
                        <img
                            onClick={OpenChest}
                            className={`${s.treasure_chest}`}
                            src="/img/home/chests/idleChest_175f.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chests/chest_idle_lights_modified.webp"
                            alt=""
                        />
                    </>
                )}
            </div>
        </div>
    );
}
