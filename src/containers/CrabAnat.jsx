import { useScrollValue } from "lib/useScroll";
import "sass/containers/crabanat.css"
export default function CrabAnat() {


    const calculatedOffsetY = useScrollValue(-20, 1550, -200);

    return (
        <div className="crab-anat" style={{ top: `calc(${calculatedOffsetY}px)` }} >
            <div className="pl-auto crab-margin">
                <h3>CRAB ANATOMY?</h3>
                <p>
                    Each body part has a chance of being normal to legendary rarity.<br />
                    Magical Item<br />
                    11% - Magical Prefix<br />
                    11% - Magical Suffix<br />
                    22% chance of a magic item
                </p>

                <h3>Rare Item</h3>
                <p>
                    11% - Magical Prefix and 11% - Magical Suffix
                </p>
                <h3>Legendary Item</h3>
                <p>
                    2% - Legendary Item Prefix
                </p>
            </div>
        </div>
    )
}
