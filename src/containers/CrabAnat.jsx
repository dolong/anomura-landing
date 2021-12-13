import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
export default function CrabAnat() {

    const scrollValue = useRecoilValue(ScrollValue);
    const scrollSpeed = -8.5;
    const scrollIndex = 3;
    let calculatedOffsetY = 0;
    let calculatedScrollValue = 0;
    const scrollOffset = 60;
    function calculateScrollValues() {
        calculatedOffsetY = scrollIndex * scrollOffset;
        calculatedScrollValue = scrollValue * scrollSpeed;
    }

    calculateScrollValues();

    const style = `calc(${calculatedOffsetY}vh + ${calculatedScrollValue}px)`;
    return (
        <div className="crab-anat" style={{ transform: `translateY(${style})` }} >
            <div className="pl-auto">
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
