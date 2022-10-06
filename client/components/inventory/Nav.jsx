import s from "/sass/inventory/nav/index.module.css";
import Enums from "enums";
import React, { useState, useContext } from "react";
// import Modal from "./shared/Modal";
// import { useWeb3React } from "@web3-react/core";
import { signOut, useSession } from "next-auth/react";
// import LoginModal from "./auth/LoginModal";
import { Web3Context } from "@context/Web3Context";
import { shortenAddress } from "@utils/shortenAddress";

// export default function MintNav({ isMobile }) {
export default function Nav() {
    const [openMenu, setOpenMenu] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    // const { active, account, activate, deactivate, chainId, connector, library } = useWeb3React();
    // const context = useWeb3React();

    const { web3modal, connect, disconnect, address } = useContext(Web3Context);

    const { data } = useSession();
    let isMobile = false;

    console.log(address);

    const handleLogout = () => {
        try {
            // console.log("trying to logout");
            signOut();
            // deactivate();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async () => {
        await connect();
    };
    return (
        <div className={s.nav_menu}>
            <div className={s.nav_stage}>
                <div className={s.nav_stage_logo}>
                    {/* <img src={`${Enums.BASEPATH}/img/mint/board/Logomark.png `} /> */}
                </div>
                <div className={s.nav_stage_text}>
                    {/* <div>Minting Now</div>
                        <div>Public</div> */}
                </div>
            </div>

            <div className={s.nav_list}>
                <a
                    className={s.nav_list_item}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(`https://anomuragame.com`, "_blank");
                    }}
                >
                    Home
                </a>
            </div>

            <div className={s.nav_button}>
                <>
                    {(() => {
                        if (!data) {
                            return (
                                <button
                                    className={s.nav_button_pink}
                                    // onClick={() => setModalOpen(true)}
                                    onClick={() => handleLogin()}
                                >
                                    <img
                                        src={`${Enums.BASEPATH}/img/shared/Button_L_Pink.png`}
                                        alt="Connect"
                                    />
                                    <div>
                                        <span>Connect Wallet</span>
                                    </div>
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    className={s.nav_button_pink}
                                    onClick={() => handleLogout()}
                                    style={{ marginLeft: "2rem" }}
                                >
                                    <img
                                        src={`${Enums.BASEPATH}/img/shared/Button_M_Pink.png`}
                                        alt="account"
                                    />
                                    <div>
                                        <span>{shortenAddress(data.user.address)}</span>
                                    </div>
                                </button>
                            );
                        }

                        //     </>
                        // );
                    })()}
                </>
            </div>
            {/* <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                render={(modal) => (
                    <LoginModal isMobile={isMobile} closeModal={() => setModalOpen(false)} />
                )}
                isConfirm={true}
            /> */}
        </div>
    );
}
// if (chain.unsupported) {
//     return (
//         <button
//             className={s.nav_button_pink}
//             // onClick={openChainModal}
//         >
//             <img
//                 src={`${Enums.BASEPATH}/img/shared/Button_L_Pink.png`}
//                 alt="Wrong Network"
//             />
//             <div>
//                 <span>Wrong network</span>
//             </div>
//         </button>
//     );
// }

// return (
//     <>
//         {/* <div onClick={openChainModal} style={{ color: "white" }}>
//             {account.displayBalance}
//         </div> */}
