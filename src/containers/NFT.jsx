import { useScrollValue } from "lib/useScroll";
export default function NFT() {

    const calculatedOffsetY = useScrollValue(-4.5, 60);
    return (
        <div className="nft" style={{ transform: `translateY(${calculatedOffsetY}px)` }}>
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
