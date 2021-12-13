import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export default function Footer() {

    const scrollValue = useRecoilValue(ScrollValue);
    const scrollSpeed = -16.5;
    const scrollIndex = 12;
    let calculatedOffsetY = 0;
    let calculatedScrollValue = 0;
    const scrollOffset = 60;
    function calculateScrollValues() {
        calculatedOffsetY = scrollIndex * scrollOffset;
        calculatedScrollValue = scrollValue * scrollSpeed;
        console.log("Calculated offset is " + calculatedOffsetY + " and calculated scroll value is " + calculatedScrollValue);
    }

    calculateScrollValues();

    const style = `calc(${calculatedOffsetY}vh + ${calculatedScrollValue}px)`;

    return (
        <div className="footer" style={{ top: style }}>
            <div>
                Footer
            </div>
        </div>
    )
}
