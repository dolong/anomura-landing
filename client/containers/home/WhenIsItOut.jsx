import { useScrollValue } from "/lib/useScroll";
import { TreasureChest } from "/containers/home/ContainerIndex";

export default function WhenIsItOut({ s, ScrollPercent }) {
    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 3020, -500, -150,-100,-170);

    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_text}>
                <h3>WHEN IS IT OUT?</h3>
                <p>
                    Anomura will be targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />A detailed road map will be available
                    shortly!
                </p>
            </div>
            <TreasureChest s={s}></TreasureChest>
        </div>
    );
}
