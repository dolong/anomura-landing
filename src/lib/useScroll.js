import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export function useScrollEvent() {

    const setOffsetY = useSetRecoilState(ScrollValue);
    const handleScroll = () => {
        setOffsetY(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });
    return setOffsetY;
}

export function useScrollValue(ScrollSpeed, ScrollOffSet, SmallScreenOffset) {
    const scrollValue = useRecoilValue(ScrollValue);
    let scrollPercent = GetScrollPercent();

    const scrollSpeed = ScrollSpeed;
    const scrollOffset = ScrollOffSet;
    const smallScreenOffset = SmallScreenOffset;
    let calculatedOffsetY = 0;
    let scrollMultiplier = 2;


    if (window.innerWidth < 800) {
        scrollMultiplier = 4;
        calculatedOffsetY = Math.floor(scrollOffset + smallScreenOffset + (scrollPercent * scrollSpeed / scrollMultiplier));
        return calculatedOffsetY;
    }
    else if (window.innerWidth < 1200) {
        scrollMultiplier = 7;
        calculatedOffsetY = Math.floor(scrollOffset + smallScreenOffset + (scrollPercent * scrollSpeed / scrollMultiplier));
        return calculatedOffsetY;
    }

    calculatedOffsetY = Math.floor(scrollOffset + (scrollPercent * scrollSpeed / scrollMultiplier));

    // console.log(calculatedOffsetY + " calculated offset");
    // console.log("inner height is: " + window.outerHeight + " scroll y is: " + window.scrollY + " Calculated size: " + (window.outerHeight + window.scrollY));

    return calculatedOffsetY;
}

function GetScrollPercent() {
    var pctScrolled = Math.floor(window.scrollY / document.body.clientHeight * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    return pctScrolled;
}