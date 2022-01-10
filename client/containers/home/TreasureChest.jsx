import { useRecoilState } from "recoil";
import { ChestState } from "/atoms/Atoms";
export default function TreasureChest({s}) {

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
    )
}

