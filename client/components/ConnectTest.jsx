import { SiteContext } from "../../context/SiteContext";
import { useEffect, useContext } from "react";


export default function ConnectTest() {

    const { ConnectWallet } = useContext(SiteContext);
    let ethereum;

    useEffect(() => {
        ethereum = window.ethereum;
    }), [];

    return (
        <div>
            <button onClick={() => ConnectWallet(ethereum)} className=" w-[30%] border-[#4949ce] border-2 rounded-md">
                <h2 className="text-3xl text-[#202060]">Wallet</h2>
            </button>
        </div>
    )
}
