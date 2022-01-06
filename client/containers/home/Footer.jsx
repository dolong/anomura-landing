import { useScrollValue } from "/lib/useScroll";

export default function Footer({ s, ScrollPercent }) {

    let calculatedOffsetY = useScrollValue(ScrollPercent, -55, 4400, -1100, -100);

    return (
        <div className={s.footer} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.logo_container}>
                <img src="/img/home/logos/vhs.png" alt="" />
                <img src="/img/home/logos/zed.png" alt="" />
            </div>
            <div className={s.footer_info}>
                <div className={s.footer_social}>
                    <img src="/img/home/logos/twitter.png" alt="Twitter" />
                    <img src="/img/home/logos/linkedin.png" alt="Linkedin" />
                </div>
                <div>
                    <p className={s.footer_text}>
                        Virtually Human is an NFT project studio exploring the boundaries of<br />
                        entertainment. We experiment with emerging technologies in gaming,art <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>

        </ div >
    )
}

export async function getStaticProps() {
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}
