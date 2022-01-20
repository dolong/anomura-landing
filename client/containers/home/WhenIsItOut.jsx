import { useScrollValue } from "/lib/useScrollValue";
import { TreasureChest } from "/containers/home/ContainerIndex";
import s from "/sass/home/home.module.css";

export default function WhenIsItOut({ ScrollPercent }) {
    //let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 3050, -500, -150, -100, -170);
    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 3400, -500, -150, -100, 5, 55);

    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_text}>
                <div>
                    <span className={s.when_highlight}>WHEN IS IT OUT?</span>
                </div>
                <p>
                    Anomura is targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />A detailed road map will be available
                    shortly!
                </p>
            </div>
            <TreasureChest s={s}></TreasureChest>
        </div>
    );
}
