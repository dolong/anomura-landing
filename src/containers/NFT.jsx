import { useScrollValue } from "lib/useScroll";
import "sass/containers/nft.css";
export default function NFT() {

    const calculatedOffsetY = useScrollValue(-6.5, 650, 75, -105);
    return (
        <div className="nft" style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className=" nft-text">
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
