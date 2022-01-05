import { useScrollValue } from "/lib/useScroll";
export default function Footer({ s }) {

    let calculatedOffsetY = 4400;
    /* Next js reads typeof window !== 'undefined' 
    /  as run this code only on the client side. 
    /  We do this because window doesn't exist 
    /  on server side so it would crash if we don't do this. 
    */
    if (typeof window !== 'undefined') {
        calculatedOffsetY = useScrollValue(-55, 4400, -1100, -100);
    }
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
