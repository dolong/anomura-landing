import { useScrollValue } from "lib/useScroll";
import { TreasureChest } from "containers/ContainerIndex";
export default function WhenIsItOut() {


    const calculatedOffsetY = useScrollValue(-11.5, 4000);

    return (
        <div className="when-zone " style={{ transform: `translateY(${calculatedOffsetY}px)` }}>
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
