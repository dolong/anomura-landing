import React from "react";
import s from "/sass/home/home.module.css";

export default function ShopZone() {
    const followRef = React.createRef();
    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            });
        });

        observer.observe(followRef.current);

        return () => {
            if (followRef.current) {
                observer.unobserve(followRef.current);
            }
        };
    }, []);

    const TurnOffSound = (e) => {
        e.preventDefault();
        console.log("turn off sound");
    };

    return (
        <div>
            <div className={`${s.shop_zone} pt-[5%]`}>
                <div className={s.shop_text}>
                    <div>
                        <span className={`${s.shop_heading}`}>COMING SOON!</span>
                        <p className={s.shop_paragraph}>
                            <span className="font-bold"> Anomura</span> is a new indie play-to-earn
                            game inspired by games like
                            <span className="font-italic"> Loop Hero, Diablo</span> and
                            <span className="font-italic"> Search for Eden</span>. Part strategic
                            gameplay, part collectible NFT characters & loot, paired with an
                            incredible community - Anomura is the
                            <span className="font-bold"> future of next-gen gaming.</span>
                        </p>
                        <p className={s.shop_paragraph}>
                            Brought to you by
                            <span className="font-bold"> Virtually Human Studio, </span>
                            creators of{" "}
                            <a href="https://zed.run/" className="font-bold text-white">
                                ZED RUN
                            </a>
                        </p>
                    </div>
                </div>
                <picture>
                    <source srcSet="/img/home/shop.webp" media="(min-width: 1200px)" />
                    <source srcSet="/img/home/shop.gif" media="(min-width: 800px)" />
                    <img className={s.shop_img} src="/img/home/shop.gif" alt="" />
                </picture>
            </div>
            <div className={s.sand_zone}>
                <div className={s.sand_zone_sand} />

                <picture>
                    <source srcSet="/img/home/follow_off.webp" media="(min-width: 1200px)" />
                    <source srcSet="/img/home/follow_off.gif" media="(min-width: 800px)" />
                    <img className={s.follow_img} src="/img/home/follow_off.gif" alt="" />
                </picture>

                <div ref={followRef} className={s.follow_iconContainer}>
                    <a href="https://twitter.com/anomuragame" target="_blank" />
                    <a href="https://discord.com/anomuragame" target="_blank" />
                    <a href="https://instagram.com/anomuragame" target="_blank" />
                    <div className={s.follow_iconContainer_icons} />
                </div>
            </div>
            {/******************* Sand Fixed Bottom*****************/}
            <div className={`${s.sandBottom_zone} ${isVisible ? "opacity-100 z-10" : ""}`}>
                <div className={s.sandBottom_left} />
                <div className={s.sandBottom_center}>
                    <div className={s.sandBottom_center_icons}>
                        <a href="https://twitter.com/anomuragame" target="_blank" />
                        <a href="https://discord.com/anomuragame" target="_blank" />
                        <a href="https://instagram.com/anomuragame" target="_blank" />
                    </div>
                    <img
                        className={s.sandBottom_icons}
                        src="/img/home/bottomSand/bottom_sand_icons_bump.png"
                    />
                </div>
                <div className={s.sandBottom_right}>
                    <div className={s.sandBottom_right_container}>
                        <a
                            className={s.sandBottom_right_container_discord}
                            href="https://discord.com/anomuragame"
                            target="_blank"
                        />
                        <a
                            href=""
                            className={s.sandBottom_right_container_soundOff}
                            onClick={TurnOffSound}
                        />
                        <div></div>
                    </div>
                    <img
                        className={s.sandBottom_image}
                        src="/img/home/bottomSand/bottom_discord_mute_sign.png"
                    />
                </div>
            </div>
        </div>
    );
}
