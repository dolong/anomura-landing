import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

export default function NFT({ ScrollPercent }) {
    let calculatedOffsetY = useScrollValue(ScrollPercent, -6.5, 700, -125, -145, -70, -80, -140);

    return (
        <div className={s.nft} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.nft_text}>
                <div>
                    <span className={s.nft_highlight}>NFT VIDEOGAME?</span>
                </div>

                <p>
                    8,000 unique and collectable anomura ranging from sentient robots to immortal
                    cosmic beings.... <br />
                    Exciting gameplay mechanics, the first indie NFT game brought to you by VHS Lab.{" "}
                    <br />
                    Join our incredible Discord & Twitter community for live updates.
                </p>
            </div>
        </div>
    );
}
