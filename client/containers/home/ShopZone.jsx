import { useState } from "react";
/**
 * The main area of the landing page with the shop gif.
 * 
 */
export default function ShopZone({ s }) {
    const [email, setEmail] = useState("");

    function handleChange(event) {
        setEmail(event.target.value);
        console.log(email);
    };
    return (
        <div>
            <div className={s.shop_zone}>
                <div className={s.shop_text}>
                    <div>
                        <h2 className="font-bold" >COMING SOON!</h2>
                        <p>
                            True Pixel Indie RPG brilliant gameplay
                            <br /> inspired by Loop Hero, Diablo, Ragnarok Online
                        </p>
                        <p>
                            <br /> <span className="font-bold">Anomura</span> will be a unique game with gameplay
                            <br /> that is both familiar and intriguing!
                        </p>
                        <p className="my-4">
                            Welcome to <span className="font-bold">the future of Indie games</span>
                            <br /> brought to you by <span className="font-bold">VHS Labs</span>, founder of <span className="bold">Zed.Run</span>
                        </p>
                    </div>
                    <h2 className="font-bold mt-4" >
                        Follow us on:
                    </h2>
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
                <div className={s.sub_img} />
                <form action="">
                    <input className={s.sub_input}
                        type="text" value={email} onChange={handleChange}
                        placeholder="Subscribe with your email here." />
                </form>
            </div>
        </div>
    )
}
