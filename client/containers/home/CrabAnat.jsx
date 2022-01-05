import { useScrollValue } from "/lib/useScroll";
export default function CrabAnat({ s }) {

    let calculatedOffsetY = 1600;
    /* Next js reads typeof window !== 'undefined' 
    /  as run this code only on the client side. 
    /  We do this because window doesn't exist 
    /  on server side so it would crash if we don't do this. 
    */
    if (typeof window !== 'undefined') {
        calculatedOffsetY = useScrollValue(-25, 1600, -200, -200);
    }

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

