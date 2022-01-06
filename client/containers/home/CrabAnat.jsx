import { useScrollValue } from "/lib/useScroll";
export default function CrabAnat({ s, ScrollPercent }) {

    let calculatedOffsetY = useScrollValue(ScrollPercent, -25, 1600, -200, -200);

    return (
        <div className={s.crab_anat} style={{ top: `calc(${calculatedOffsetY}px)` }} >
            <div className={s.crab_text}>
                <p>CRAB ANATOMY?</p>
                <p>
                    Each body part has a chance of being normal to legendary rarity.<br />
                    Magical Item<br />
                    11% - Magical Prefix<br />
                    11% - Magical Suffix<br />
                    22% chance of a magic item<br />
                    Rare Item<br />
                    11% - Magical Prefix and 11% - Magical Suffix<br />
                    Legendary Item<br />
                    2% - Legendary Item Prefix
                </p>
            </div>
        </div>
    )
}

