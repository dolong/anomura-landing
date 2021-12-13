import ChestOpeningImg from "img/chest_open.gif";
import ChestIdleImg from "img/chest_idle.gif";
import ChestOpenedImg from "img/chest_openedidle.gif";
import { useState } from "react";
export default function TreasureChest() {

    const [chestState, setChestState] =  useState("idle");

    return (
        <div className="treasure-zone">
            {
                chestState === "idle" &&
                <img src={ChestIdleImg} alt="" />
            }
            {
                chestState === "opening" &&
                <img src={ChestOpeningImg} alt="" />
            }
            {
                chestState === "opened" &&
                <img src={ChestOpenedImg} alt="" />
            }
        </div>
    )
}

