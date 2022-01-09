import { useRecoilState } from "recoil";
import { ChestState } from "/atoms/Atoms";
export default function TreasureChest({ s }) {
    const [chestState, setChestState] = useRecoilState(ChestState);

    function OpenChest() {
        if (chestState === "idle") {
            setChestState("opening");
            setTimeout(() => {
                setChestState("opened");
            }, 1200);
        }
    }

    return (
        <div onClick={OpenChest} className={s.treasure_zone}>
            {chestState === "opening" && (
                <img className={s.treasure_img} src="/img/home/chest_open.gif" alt="" />
            )}
            {chestState === "opened" && (
                <img className={s.treasure_img} src="/img/home/chest_openedidle.gif" alt="" />
            )}
            {chestState === "idle" && (
                <img className={s.treasure_img} src="/img/home/chest_idle.gif" alt="" />
            )}
        </div>
    );
}
