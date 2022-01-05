import { useScrollValue } from "/lib/useScroll";
export default function NFT({ s }) {

    let calculatedOffsetY = 700;
    /* Next js reads typeof window !== 'undefined' 
    /  as run this code only on the client side. 
    /  We do this because window doesn't exist 
    /  on server side so it would crash if we don't do this. 
    */
    if (typeof window !== 'undefined') {
        calculatedOffsetY = useScrollValue(-6.5, 700, -75, -105);
    }

    return (
        <div className={s.nft} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.nft_text}>
                <p>NFT VIDEOGAME?</p>
                <p>
                    8,000 unique and collectable anomura ranging from sentient robots to immortal cosmic beings.... <br />
                    Exciting gameplay mechanics, the first indie NFT game brought to you by VHS Lab. <br />
                    Join our incredible Discord & Twitter community for live updates.
                </p>
            </div>
        </div >
    )
}
