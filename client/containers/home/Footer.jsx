import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
export default function Footer({ ScrollPercent }) {
    /*  position for extracting the whole page for mobile view on Creative Review board, will remove once everything is approved
        let calculatedOffsetY = useScrollValue(ScrollPercent, -6, 3000, -950, -600, -750, -850, -850);
    */
    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 5070, -950, -600, -750, -850, -850);

    return (
        <div className={s.footer} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.logo_container}>
                <img src="/img/home/logos/vhs.png" alt="" />
            </div>
            <div className={s.footer_info}>
                <div className={s.footer_social}>
                    <img src="/img/home/logos/linkedin.png" alt="Linkedin" />
                    <img src="/img/home/logos/twitter.png" alt="Twitter" />
                </div>
                <div>
                    <p className={s.footer_text}>
                        Virtually Human Studio’s mission is to <br />
                        uncover what the future of entertainment <br />
                        can do for humanity. Their flagship game <br />
                        ZED RUN  is one of the first of its kind <br />
                        created on the blockchain and is one <br />
                        of the leading NFT games built on Ethereum <br />
                        globally.
                    </p>
                </div>
            </div>
        </div>
    );
}
