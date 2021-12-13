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
    }

    calculateScrollValues();

    const style = `calc(${calculatedOffsetY}vh + ${calculatedScrollValue}px)`;

    return (
        <div className="footer" style={{ transform: `translateY(${style})` }}>
            <div className="logo-containter">
            </div>
            <div className="footer-info">
                <div className="footer-social">

                </div>
                <div>
                    <p>
                        Virtually Human is an NFT project studio exploring the boundaries of<br />
                        entertainment. We experiment with emerging technologies in gaming,art <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>

        </div>
    )
}
