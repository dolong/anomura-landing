import { useState } from "react";
import s from "/sass/home/home.module.css";

export default function TreasureChest() {
    const [chestState, setChestState] = useState("idle");

    function OpenChest() {
        if (chestState === "idle") {
            setChestState("opening");
            setTimeout(() => {
                setChestState("opened");
            }, 400);
        }
    }

    return (
        <div className={s.treasure_zone}>
            <div className={s.treasure_chestContainer}>
                {chestState === "opening" && (
                    <>
                        <img
                            className={`${s.treasure_card} invisible`}
                            src="/img/home/cards/Card.gif"
                            alt=""
                        />
                        <img className={s.treasure_chest} src="/img/home/chest_open.gif" alt="" />
                    </>
                )}
                {chestState === "opened" && (
                    <>
                        <img
                            className={`${s.treasure_card}`}
                            src="/img/home/cards/Card.gif"
                            alt=""
                        />
                        <img
                            className={s.treasure_chest}
                            src="/img/home/chest_openedidle.gif"
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
                            onClick={OpenChest}
                            className={s.treasure_chest}
                            src="/img/home/chest_idle.gif"
                            alt=""
                        />
                    </>
                )}
            </div>
        </div>
    );
}
