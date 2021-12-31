import { useScrollValue } from "lib/useScroll";
import VHSImg from "img/logos/vhs.png";
import ZedImg from "img/logos/zed.png";
import TwitterImg from "img/logos/twitter.png";
import LinkedinImg from "img/logos/linkedin.png";
import "sass/containers/footer.css"
export default function Footer() {

    const calculatedOffsetY = useScrollValue(-55, 4400, -1100, -100);

    return (
        <div className="footer" style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className="logo-container">
                <img src={VHSImg} alt="" />
                <img src={ZedImg} alt="" />
            </div>
            <div className="footer-info ">
                <div className="footer-social">
                    <img src={TwitterImg} alt="Twitter" />
                    <img src={LinkedinImg} alt="Twitter" />
                </div>
                <div>
                    <p className="footer-text">
                        Virtually Human is an NFT project studio exploring the boundaries of<br />
                        entertainment. We experiment with emerging technologies in gaming,art <br />
                        sports and digital collectables.
                    </p>
                </div>
            </div>

        </ div >
    )
}
