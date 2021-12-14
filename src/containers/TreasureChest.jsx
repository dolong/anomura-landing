import ChestOpeningImg from "img/chest_open.gif";
import ChestIdleImg from "img/chest_idle.gif";
import ChestOpenedImg from "img/chest_openedidle.gif";
import { useRecoilState } from "recoil";
import { ChestState } from "Atom/Atoms";
export default function TreasureChest() {

    const [chestState, setChestState] = useRecoilState(ChestState);


    function OpenChest() {
        if (chestState === "idle") {
            setChestState("opening");
            setTimeout(() => {
                setChestState("opened");
            }, 1200);
        }
    };

    return (
        <div onClick={OpenChest} className="treasure-zone">
            {
                chestState === "opening" &&
                <img className="treasure-img" src={ChestOpeningImg} alt="" />
            }
            {
                chestState === "opened" &&
                <img className="treasure-img" src={ChestOpenedImg} alt="" />
            }
            {
                chestState === "idle" &&
                <img className="treasure-img" src={ChestIdleImg} alt="" />
            }
        </div>
    )
}

