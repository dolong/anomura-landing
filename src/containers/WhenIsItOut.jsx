import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import { TreasureChest } from "containers/ContainerIndex";
export default function WhenIsItOut() {

    const scrollValue = useRecoilValue(ScrollValue);
    const scrollSpeed = -11.5;
    const scrollIndex = 6;
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
        <div className="when-zone " style={{ transform: `translateY(${style})` }}>
            <div className="pl-auto">
                <h3>WHEN IS IT OUT?</h3>
                <p>
                    Anomura will be targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />
                    A detailed roadmap will be available shortly!
                </p>
                <TreasureChest></TreasureChest>
            </div>

        </div>
    )
}
