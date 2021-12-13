import { useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import { useEffect, useState } from "react";
export default function CrabAnat() {

    const scrollValue = useRecoilValue(ScrollValue);
     
    const [showView, setShowView] = useState("animTransparent");

    useEffect(() => {
        if (scrollValue > 300)
            setShowView("animOpaque");
        else 
            setShowView("animTransparent");
            
    }, [scrollValue]);
    
    return (
        <div className={"crab-anat " + showView} style={{ transform: 'translate(0,10)'}} >
            <div className="pl-auto">
                <h3>CRAB ANATOMY?</h3>
                <p>
                    Each body part has a chance of being normal to legendary rarity.<br/>
                    Magical Item<br/>
                    11% - Magical Prefix<br />
                    11% - Magical Suffix<br />
                    22% chance of a magic item
                </p>

                <h3>Rare Item</h3>
                <p>
                11% - Magical Prefix and 11% - Magical Suffix
                </p>
                <h3>Legendary Item</h3>
                <p>
                    2% - Legendary Item Prefix
                </p>
            </div>
        </div>
    )
}
