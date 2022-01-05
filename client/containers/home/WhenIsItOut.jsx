import { useScrollValue } from "/lib/useScroll";
import { TreasureChest } from "/containers/home/ContainerIndex";
export default function WhenIsItOut({ s }) {

    let calculatedOffsetY = 3020;
    /* Next js reads typeof window !== 'undefined' 
    /  as run this code only on the client side. 
    /  We do this because window doesn't exist 
    /  on server side so it would crash if we don't do this. 
    */
    if (typeof window !== 'undefined') {
        calculatedOffsetY = useScrollValue(-55, 3020, -500, 50);
    }

    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_text}>
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
