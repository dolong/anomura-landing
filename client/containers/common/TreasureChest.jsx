import React, { useState, useEffect, useLayoutEffect } from "react";
import s from "/sass/home/home.module.css";

export default function TreasureChest() {
    const [chestState, setChestState] = useState("idle");
    const [isChestChimePlay, setChestChimePlay] = useState(false);
    const [isChestFishPlay, setChestFishPlay] = useState(false);
    const treasureRef = React.createRef();
    let maxChestChimeVolume = 0.1;

    let chestChime = document.getElementById("chest-chime");
    let chestFish = document.getElementById("chest-fish");

    useLayoutEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [treasureRef]);

    useEffect(() => {
        let intervalId, timeoutId;
        if (chestState === "opened") {
            timeoutId = setTimeout(() => {
                chestFish.play();
                intervalId = setInterval(() => {
                    chestFish.play();
                }, 8400);
            }, 4200);
            setChestFishPlay(true);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [chestState]);

    const handleScroll = () => {
        if (treasureRef.current) {
            let rect = treasureRef.current.getBoundingClientRect();
            if (rect.top < 0 && chestState === "idle" && !isChestChimePlay) {
                chestChime.play();
                chestChime.volume = 0.09;
                setChestChimePlay(true);
            }
            if (isChestChimePlay) {
                let reference = Math.abs(rect.bottom);

                let newVolume = maxChestChimeVolume - reference / 10000;
                if (newVolume < 0.02) {
                    chestChime.volume = 0;
                } else {
                    {
                        chestChime.volume = newVolume;
                    }
                }
            }
            if (isChestFishPlay) {
                let reference = Math.abs(rect.bottom);

                let newVolume = 1 - reference / 800; // no fish sound around footer
                if (newVolume < 0.1) {
                    chestFish.volume = 0;
                } else {
                    {
                        chestFish.volume = newVolume;
                    }
                }
            }
        }
    };
    function OpenChest() {
        if (chestState === "idle") {
            setChestState("opening");
            setTimeout(() => {
                setChestState("opened");
            }, 300);
        }

        chestChime.pause();
        new Audio("/audio/Chest Open.wav").play();
    }

    return (
        <div className={s.treasure_zone} ref={treasureRef}>
            <audio src="/audio/chest chime.wav" type="audio/wav" id="chest-chime" loop></audio>
            <audio src="/audio/Fish Pass by 1.wav" type="audio/wav" id="chest-fish"></audio>
            <div className={s.treasure_image}>
                {chestState === "opening" && (
                    <>
                        <img
                            className={`${s.treasure_card} invisible`}
                            src="/img/home/cards/Card.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chestfloor_modified.png"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chest}`}
                            src="/img/home/chest_open.gif"
                            alt=""
                        />

                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chest_idle_lights_modified.png"
                            alt=""
                        />
                    </>
                )}
                {chestState === "opened" && (
                    <>
                        <img
                            className={`${s.treasure_card}`}
                            src="/img/home/cards/Card.gif"
                            alt=""
                        ></img>

                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chestfloor_modified.png"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chest}`}
                            src="/img/home/chest_openedidle.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chest_open_lights_modified.png"
                            alt=""
                        />
                    </>
                )}
                {chestState === "idle" && (
                    <>
                        <img
                            className={`${s.treasure_card} invisible`}
                            src="/img/home/cards/Card.gif"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestFloor}`}
                            src="/img/home/chestfloor_modified.png"
                            alt=""
                        />
                        <img
                            onClick={OpenChest}
                            className={`${s.treasure_chest}`}
                            src="/img/home/chest_idle.webp"
                            alt=""
                        />
                        <img
                            className={`${s.treasure_chestLight}`}
                            src="/img/home/chest_idle_lights_modified.png"
                            alt=""
                        />
                    </>
                )}
            </div>
        </div>
    );
}
