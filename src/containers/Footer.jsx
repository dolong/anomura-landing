import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import { useEffect, useState } from "react";

export default function Footer() {

    const scrollValue = useRecoilValue(ScrollValue);
     
    const [showView, setShowView] = useState("animTransparent");

    useEffect(() => {
        if (scrollValue > 1200)
            setShowView("animOpaque");
        else 
            setShowView("animTransparent");
            
      },[scrollValue]);

    
    return (
        <div className={"footer " + showView} style={{ transform: 'translate(0,120vh)'}}>
            <div>
                Footer
            </div>
        </div>
    )
}
