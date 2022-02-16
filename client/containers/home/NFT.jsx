import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

export default function NFT({ ScrollPercent }) {
    //original
    let calculatedOffsetY = useScrollValue(ScrollPercent, -6.5, 700, -125, -145, -70, -80, -90);

    //let calculatedOffsetY = useScrollValue(ScrollPercent, -4.5, 700, -125, -145, -100, -190, -90);
    return (
        <div className={s.nft} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.nft_text}>
                <div>
                    <span className={s.nft_heading}>NFT x VIDEOGAME!</span>
                    <p className={s.nft_paragraph}>Anomuras are the protectors of the earth.</p>
                    <p className={s.nft_paragraph}>
                        <span className="font-bold"> 10,000</span> original Anomuras with unique
                        traits and habitats will be crafted to be minted.
                    </p>
                    <p className={s.nft_paragraph}>
                        Your Anomura NFT will be your{" "}
                        <span className="font-bold"> exclusive pass</span> to gain early access to
                        the game, reap rewards and participate in events.
                    </p>
                </div>
            </div>
        </div>
    );
}
