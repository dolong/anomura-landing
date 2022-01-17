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
            {
                chestState === "opening" &&
                <>
                    <img className="treasure-img invisible" src="/img/home/cards/Card.gif" alt="" />
                    <img className="treasure-img" src="/img/home/chest_open.gif" alt="" />
                </>
            }
            {
                chestState === "opened" &&
                <>
                    <img className="treasure-img" src="/img/home/cards/Card.gif" alt="" />
                    <img className="treasure-img" src="/img/home/chest_openedidle.gif" alt="" />
                </>
            }
            {

                chestState === "idle" &&
                <>
                    <img className="treasure-img invisible" src="/img/home/cards/Card.gif" alt="" />
                    <img onClick={OpenChest} className="treasure-img" src="/img/home/chest_idle.gif" alt="" />
                </>
            }
        </div>
    );
}
