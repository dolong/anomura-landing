import React, { useState } from "react";
import s from "/sass/home/home.module.css";
/**
 * The main area of the landing page with the shop gif.
 *
 */
export default function ShopZone() {
    const [email, setEmail] = useState("");
    const inputRef = React.createRef();

    function handleChange(event) {
        setEmail(event.target.value);
        console.log(email);
    }

    return (
        <div>
            <div className={`${s.shop_zone} pt-[5%]`}>
                <div className={s.shop_text}>
                    <div>
                        <h2 className="font-bold">COMING SOON!</h2>
                        <p>
                            <br /> <span className="font-bold">Anomura</span> is a new indie play-to-earn game inspired by
                            games like Loop Hero, Diablo and Ragnarok Online. Part strategic gameplay, part collectible NFT
                            characters & loot, paired with an incredible community — Anomura is the <span className="font-bold">future of next-gen gaming.</span>

                        </p>
                    </div>
                    <p>
                        <br />Brought to you by <span className="font-bold">Virtually Human Studio</span>, creators of <a href="https://zed.run/" className="underline"> ZED RUN!</a>
                    </p>
                    <h2 className="mt-4">Follow us for the latest updates:</h2>
                    <div className="flex gap-6">
                        <a href="https://twitter.com/anomuragame">
                            <p className="font-bold">Twitter</p>
                        </a>
                        <a href="https://instagram.com/anomuragame">
                            <p className="font-bold">Instagram</p>
                        </a>
                    </div>
                </div>
                <img className={s.shop_img} src="/img/home/shop.gif" alt="" />
            </div>
            <div className={s.sand_zone}>
                <div className={s.sub_img} onClick={() => inputRef?.current.focus()} />
                <div className={s.sub_container} action="">
                    <input
                        className={`${s.sub_input} placeholder:text-white placeholder:opacity-80`}
                        type="text"
                        value={email}
                        onChange={handleChange}
                        placeholder="Subscribe with your email here."
                        ref={inputRef}
                    />
                    <span
                        className={s.sub_arrow}
                        onClick={() => {
                            alert("subscribe");
                        }}
                    />
                </div>
            </div>
        </div >
    );
}
