import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

export default function CrabAnat({ ScrollPercent }) {
    /*  position for extracting the whole mobile view on Creative Review board, will remove once everything is approved
        let calculatedOffsetY = useScrollValue(ScrollPercent, -6, 1150, -200, -200, 100, -200, -200);
    */

    let calculatedOffsetY = useScrollValue(ScrollPercent, -25, 1850, -200, -200, -100, -200, -200);
    return (
        <div className={s.crab_anat} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.crab_text}>
                <div>
                    <span className={s.crab_normal}>CRAB ANATOMY!</span>
                    <div className={s.crab_inline}>
                        Each body part has a chance of being normal to legendary in rarity.
                    </div>
                </div>

                <div className={s.crab_rarityContainer}>
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_magical}>Magical Item</span>
                        </div>

                        <div className={s.crab_inline}>
                            11% - 1 Magical Prefix
                            <br />
                            11% - 1 Magical Suffix
                            <br />
                            ~22% chance of a magic item
                        </div>
                    </div>
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_rare}>Rare Item</span>
                        </div>
                        <div className={s.crab_inline}>
                            11% - Magical Prefix <br />
                            11% - Magical Suffix
                        </div>
                    </div>
                    <div className={s.crab_rarityBlock}>
                        <div>
                            <span className={s.crab_legend}>Legendary Item</span>
                        </div>
                        <div className={s.crab_inline}>~2% - Legendary Item Prefix</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
