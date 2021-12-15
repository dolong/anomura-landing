import { useScrollValue } from "lib/useScroll";
import VHSImg from "img/logos/vhs.png";
import ZedImg from "img/logos/zed.png";
import "sass/containers/footer.css"
export default function Footer() {

    const calculatedOffsetY = useScrollValue(-17.5, 700);

    return (
        <div className="footer" style={{ transform: `translateY(${calculatedOffsetY}vh)` }}>
            <div className="logo-containter">
            </div>
            <div className="footer-info pl-auto">
                <div className="footer-social">

                </div>
                <div>
                    <p>
                        Virtually Human is an NFT project studio exploring the boundaries of<br />
                        entertainment. We experiment with emerging technologies in gaming,art <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>

        </ div>
    )
}
