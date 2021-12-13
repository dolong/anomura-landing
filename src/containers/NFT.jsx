import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
export default function NFT() {

    const scrollValue = useRecoilValue(ScrollValue);
    const scrollSpeed = -4.5;
    const scrollIndex = 1;
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
        <div className="nft" style={{ top: style }} >
            <div className="d-flex col f-justify-c pl-auto">
                <p>NFT VIDEOGAME?</p>
                <p>
                    8,000 unique and collectable anomura ranging from sentient robots to immportal oosmic beings.... <br />
                    Exciting gameplay mechanics, the first indie NFT game brought to you by VHS Lab. <br />
                    Join our incredible Discord & Tiwtter community for live updates.
                </p>
            </div>
        </div >
    )
}
