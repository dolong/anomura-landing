import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
export default function Footer({ ScrollPercent }) {
    /*  position for extracting the whole page for mobile view on Creative Review board, will remove once everything is approved
        let calculatedOffsetY = useScrollValue(ScrollPercent, -6, 2800, -950, -600, -750, -850, -850);
    */

    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 5070, -950, -600, -750, -850, -850);

    return (
        <div className={s.footer_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.footer_logo}>
                <img src="/img/home/logos/vhs.png" alt="" />
            </div>
            <div className={s.footer_info}>
                <div className={s.footer_social}>
                    <img src="/img/home/logos/linkedin.png" alt="Linkedin" />
                    <img src="/img/home/logos/twitter.png" alt="Twitter" />
                </div>
            </div>
            <div className={s.footer_text}>
                <p>
                    Virtually Human Studio’s mission is to uncover what the future of entertainment
                    can do for humanity. Their flagship game ZED RUN is one of the first of its kind
                    created on the blockchain and is one of the leading NFT games built on Ethereum
                    globally.
                </p>
            </div>
        </div>
    );
}
