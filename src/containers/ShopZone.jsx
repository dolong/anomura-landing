import ShopImg from "img/shop.gif";
import SubscribeImg from "img/subscribe.png";
import { useState } from "react";
import "sass/containers/shopzone.css"
/**
 * The main area of the landing page with the shop gif.
 * 
 */
export default function ShopZone() {

    const [email, setEmail] = useState("");

    function handleChange(event) {
        setEmail(event.target.value);
        console.log(email);
    };

    return (
        <div>
            <div className="shop-zone">
                <div className="shop-text">
                    <div>
                        <h2 className="bold" >COMING SOON!</h2>
                        <p>
                            True Pixel Indie RPG brilliant gameplay
                            <br /> inspired by Loop Hero, Diablo, Ragnarok Online
                        </p>
                        <p>
                            <br /> <span className="bold">Anomura</span> will be a unique game with gameplay
                            <br /> that is both familiar and intriguing!
                        </p>
                        <p className="mt-2">
                            Welcome to <span className="bold">the future of Indie games</span>
                            <br /> brought to you by <span className="bold">VHS Labs</span>, founder of <span className="bold">Zed.Run</span>
                        </p>
                    </div>

                    <h2 className="bold mt-2" >
                        Follow us on:
                    </h2>
                    <div className="d-flex social-shop">
                        <a href="https://twitter.com/anomuragame">
                            <p className="bold">Twitter</p>
                        </a>
                        <a href="https://instagram.com/anomuragame">
                            <p className="bold">Instagram</p>
                        </a>
                    </div>
                </div>
                <img className="shop-img" src={ShopImg} alt="" />
            </div>
            <div className="sand-zone">
                <img className="sub-img" src={SubscribeImg} alt="" />
                <form action="">
                    <input className="sub-input" type="text" value={email} onChange={handleChange} placeholder="Subscribe with your email here." />
                </form>
            </div>
        </div>
    )
}
