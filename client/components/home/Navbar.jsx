import s from "/sass/home/nav.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
/**
 * The main navbar for the website.
 * @returns
 */

export default function Navbar({ isMobile }) {
    // export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    let router = useRouter();
    // let isMobile = true;
    if (isMobile) {
        return (
            <>
                <div className={s.nav_bar}>
                    <div className={s.nav_button}>
                        <button
                            onClick={() => {
                                // document.body.style.overflowY = "hidden";
                                document.body.style.position = "fixed";
                                setOpenMenu(!openMenu);
                            }}
                            className={s.nav_button_pink}
                            style={{ marginLeft: "1rem" }}
                        >
                            <img src={`img/home/Button_M_Pink.png`} alt="Menu" />
                            <div>
                                <span>MENU</span>
                            </div>
                        </button>
                    </div>
                </div>
                {openMenu && (
                    <div className={s.nav_mobile}>
                        <div className={s.nav_mobile_wrapper}>
                            <button
                                onClick={() => {
                                    // document.body.style.overflowY = "visible";
                                    document.body.style.position = "relative";
                                    setOpenMenu(false);
                                }}
                                className={s.nav_mobile_close}
                            >
                                X
                            </button>
                            <div className={s.nav_mobile_content}>
                                <div className={s.nav_mobile_content_list}>
                                    <a
                                        className={s.nav_mobile_content_list_item}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.body.style.position = "relative";
                                            router.push("/");
                                        }}
                                    >
                                        Home
                                    </a>
                                    <a
                                        className={s.nav_mobile_content_list_item}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(
                                                `https://anomuragame.com/litepaper`,
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Litepaper
                                    </a>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();

                                            document.body.style.position = "relative";
                                            router.push("/roadmap");
                                        }}
                                        className={s.nav_mobile_content_list_item}
                                    >
                                        Roadmap
                                    </a>

                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();

                                            document.body.style.position = "relative";
                                            router.push("/about");
                                        }}
                                        className={s.nav_mobile_content_list_item}
                                    >
                                        About
                                    </a>

                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(
                                                `https://anomuragame.com/challenger`,
                                                "_blank"
                                            );
                                        }}
                                        className={s.nav_mobile_content_list_item}
                                    >
                                        Challenger
                                    </a>

                                    <button
                                        className={s.nav_mobile_content_list_button}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    >
                                        <img src={`/img/home/Button_M_Pink.png`} alt="name" />
                                        <div>
                                            <span>Mint</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <div className={s.nav_wrapper}>
                <div className={s.nav_menu}>
                    <div className={s.nav_list}>
                        <div className={s.nav_list_first}>
                            <a
                                className={`${s.nav_list_item} ${
                                    router.pathname == "/" ? s.nav_list_item_white : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/");
                                }}
                            >
                                Home
                            </a>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://anomuragame.com/litepaper`, "_blank");
                                }}
                                className={s.nav_list_item}
                            >
                                Litepaper
                            </a>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/roadmap");
                                }}
                                className={`${s.nav_list_item} ${
                                    router.pathname == "/roadmap" ? s.nav_list_item_white : ""
                                }`}
                            >
                                Roadmap
                            </a>
                        </div>
                        <div className={s.nav_list_mid}>
                            <div className={s.nav_list_mid_wrapper}>
                                <img src="/img/home/footer/logo-pink.png" />
                            </div>
                        </div>
                        <div className={s.nav_list_last}>
                            <a
                                className={`${s.nav_list_item} ${
                                    router.pathname == "/about" ? s.nav_list_item_white : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/about");
                                }}
                            >
                                About
                            </a>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://anomuragame.com/challenger`, "_blank");
                                }}
                                className={s.nav_list_item}
                            >
                                Challenger
                            </a>

                            <div className={s.nav_button}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(`https://anomuragame.com`, "_blank");
                                    }}
                                    className={s.nav_button_pink}
                                >
                                    <img src={`/img/home/Button_L_Pink.png`} alt="Menu" />
                                    <div>
                                        <span>MINT NOW</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
