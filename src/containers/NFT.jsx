import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import { useEffect, useState } from "react";
export default function NFT() {

    const scrollValue = useRecoilValue(ScrollValue);
     
    const [showView, setShowView] = useState("animTransparent");

    useEffect(() => {
        if (scrollValue > 400)
            setShowView("animOpaque");
        else
            setShowView("animTransparent");
            
      },[scrollValue]);

    return (
        <div className={ showView + " nft"} >
            <div className="container text-center" >
                <p>NFT VIDEOGAME?</p>
                <p>
                    8,000 unique and collectable anomura ranging from sentient robots to immportal oosmic beings.... <br />
                    Exciting gameplay mechanics, the first indie NFT game brought to you by VHS Lab. <br />
                    Join our incredible Discord & Tiwtter community for live updates.
                </p>
            </div>
        </div>
    )
}
