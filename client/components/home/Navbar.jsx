import s from "/sass/home/nav.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
/**
 * The main navbar for the website.
 * @returns
 */
// export default function Navbar({ isMobile }) {
export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    let router = useRouter();
    let isMobile = false;
    if (isMobile) {
        return (
            <>
                <div className={s.nav_menu}>
                    <div className={s.nav_stage}>
                        <div className={s.nav_stage_logo}>
                            <img src="/img/mint/board/Logomark.png" />
                        </div>
                        <div className={s.nav_stage_text}>
                            <div>Minting Now</div>
                            <div>Mint List</div>
                        </div>
                        <div className={s.nav_button}>
                            <button
                                onClick={() => setOpenMenu(!openMenu)}
                                className={s.nav_button_pink}
                                style={{ marginLeft: "1rem" }}
                            >
                                <img src={`/img/mint/board/Button_M_Pink.png`} alt="Menu" />
                                <div>
                                    <span>MENU</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {openMenu && (
                    <div className={s.nav_mobile}>
                        <div className={s.nav_mobile_wrapper}>
                            <button
                                onClick={() => setOpenMenu(false)}
                                className={s.nav_mobile_close}
                            >
                                X
                            </button>
                            <div className={s.nav_mobile_content}>
                                <div className={s.nav_mobile_content_logo}>
                                    <img
                                        src="/img/mint/board/logo-pink.png"
                                        alt="AnomuraLogo"
                                        onClick={() => {
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    />
                                </div>

                                <div className={s.nav_mobile_content_list}>
                                    <a
                                        className={s.nav_list_item}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    >
                                        Home
                                    </a>
                                    <a
                                        className={s.nav_list_item}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    >
                                        Litepaper
                                    </a>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                        className={s.nav_list_item}
                                    >
                                        Team
                                    </a>
                                </div>
                                <div className={s.nav_mobile_content_footer}>
                                    <div className={s.nav_mobile_content_footer_button}>
                                        <ConnectButton.Custom>
                                            {({
                                                account,
                                                chain,
                                                openAccountModal,
                                                openChainModal,
                                                openConnectModal,
                                                mounted,
                                            }) => {
                                                return (
                                                    <>
                                                        {(() => {
                                                            if (!mounted || !account || !chain) {
                                                                return (
                                                                    <button
                                                                        onClick={openConnectModal}
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_pink
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={`/img/mint/board/Button_L_Pink.png`}
                                                                            alt="Menu"
                                                                        />
                                                                        <div>
                                                                            <span>
                                                                                CONNECT WALLET
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            }

                                                            if (chain.unsupported) {
                                                                return (
                                                                    <button
                                                                        onClick={openChainModal}
                                                                        type="button"
                                                                    >
                                                                        Wrong network
                                                                    </button>
                                                                );
                                                            }

                                                            return (
                                                                <>
                                                                    <div
                                                                        onClick={openAccountModal}
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_balance
                                                                        }
                                                                    >
                                                                        {account.displayBalance}
                                                                    </div>

                                                                    <button
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_pink
                                                                        }
                                                                        onClick={openAccountModal}
                                                                    >
                                                                        <img
                                                                            src={`/img/mint/board/Button_M_Pink.png`}
                                                                            alt="name"
                                                                        />
                                                                        <div>
                                                                            <span>
                                                                                {
                                                                                    account.displayName
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                </>
                                                            );
                                                        })()}
                                                    </>
                                                );
                                            }}
                                        </ConnectButton.Custom>
                                    </div>
                                    <div className={s.nav_mobile_content_footer_socials}>
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://twitter.com/anomuragame`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src="/img/mint/board/Social_Twitter.png" />
                                        </div>
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://discord.gg/anomuragame`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src="/img/mint/board/Social_Discord.png" />
                                        </div>
                                        {/* <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(`https://etherscan.io/`, "_blank")
                                            }
                                        >
                                            <img src="/img/mint/board/Social_Etherscan.png" />
                                        </div> */}
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(`https://opensea.io/`, "_blank")
                                            }
                                        >
                                            <img src="/img/mint/board/Social_Opensea.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <div className={s.nav}>
                <div className={s.nav_menu}>
                    {/* <div className={s.nav_stage}>
                      
                        <div className={s.nav_stage_text}>
                            <div>Minting Now</div>
                            <div>Mint List Holders</div>
                        </div>
                        <div className={s.nav_stage_logo}>
                            <img src="/img/mint/board/Logomark.png" />
                        </div>
                    </div> */}

                    <div className={s.nav_list}>
                        <div className={s.nav_list_first}>
                            <a
                                className={s.nav_list_item}
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
                                    // window.open(`https://anomuragame.com/roadmap`, "_blank");
                                    router.push("/roadmap");
                                }}
                                className={s.nav_list_item}
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
                                className={s.nav_list_item}
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

                    {/* <div className={s.nav_button}></div>  */}
                </div>
            </div>
        );
    }
}
