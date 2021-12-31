import { useScrollValue } from "lib/useScroll";
import { TreasureChest } from "containers/ContainerIndex";
import "sass/containers/when.css"
export default function WhenIsItOut() {


    const calculatedOffsetY = useScrollValue(-55, 3020, -500, 50);

    return (
        <div className="when-zone " style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className="when-text">
                <h3>WHEN IS IT OUT?</h3>
                <p>
                    Anomura will be targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />
                    A detailed road map will be available shortly!
                </p>
            </div>
            <TreasureChest></TreasureChest>
        </div>
    )
}
