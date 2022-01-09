import { useScrollValue } from "/lib/useScroll";

export default function Footer({ s, ScrollPercent }) {
    //let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 4400, -1000, -100);
    let calculatedOffsetY = useScrollValue(ScrollPercent, -57, 4350, -1000, -175);
    return (
        <div className={s.footer} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.logo_container}>
                <img src="/img/home/logos/vhs.png" alt="" />
                <img src="/img/home/logos/zed.png" alt="" />
            </div>
            <div className={s.footer_info}>
                <div className={s.footer_social}>
                    <img src="/img/home/logos/linkedin.png" alt="Linkedin" />
                    <img src="/img/home/logos/twitter.png" alt="Twitter" />
                </div>
                <div>
                    <p className={s.footer_text}>
                        Virtually Human is an NFT project studio exploring the boundaries of
                        <br />
                        entertainment. We experiment with emerging technologies in gaming,art <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>
        </div>
    );
}
