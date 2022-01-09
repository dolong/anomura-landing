import { useScrollValue } from "/lib/useScroll";
import { TreasureChest } from "/containers/home/ContainerIndex";

export default function WhenIsItOut({ s, ScrollPercent }) {
    //let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 3020, -500, 50);
    let calculatedOffsetY = useScrollValue(ScrollPercent, -48, 3050, -550, -50);
    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_text}>
                <div>
                    <span className={s.when_highlight}>WHEN IS IT OUT?</span>
                </div>
                <p>
                    Anomura will be targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />A detailed road map will be available
                    shortly!
                </p>
            </div>
            <TreasureChest></TreasureChest>
        </div>
    );
}
