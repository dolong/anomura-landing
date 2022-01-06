import { useEffect } from "react";
import { useScrollValue } from "/lib/useScroll";

export default function NFT({ s, ScrollPercent }) {

    let calculatedOffsetY = useScrollValue(ScrollPercent, -6.5, 700, -75, -105);

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
