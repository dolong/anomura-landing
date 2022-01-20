import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
export default function Footer({ ScrollPercent }) {
    // let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 5500, -950, -600, -750, -1050);
    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        -55,
        5000,
        -950,
        -600,
        -750,
        -1000,
        -1000
    );

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
                        entertainment. We experiment with emerging technologies in gaming, art
                        <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>
        </div>
    );
}
