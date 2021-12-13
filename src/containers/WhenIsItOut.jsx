import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import { useEffect, useState } from "react";
import { TreasureChest  } from "containers/ContainerIndex";
export default function WhenIsItOut() {

    const scrollValue = useRecoilValue(ScrollValue);
     
    const [showView, setShowView] = useState("animTransparent");

    useEffect(() => {
        if (scrollValue > 550)
            setShowView("animOpaque");
        else 
            setShowView("animTransparent");
            
    }, [scrollValue]);
    return (
        <div className={"when-zone " + showView} style={{ transform: 'translate(0,50vh)'}}>
            <div className="pl-auto">
                <h3>WHEN IS IT OUT?</h3>
                <p>
                    Anomura will be targeted to be released by the end of 2021, <br />
                    with many alpha and beta releases. <br />
                    A detailed roadmap will be available shortly!
                </p>
                <TreasureChest></TreasureChest>
            </div>
         
        </div>
    )
}
