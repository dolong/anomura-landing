import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export function useScrollEvent() {

    const setScrollPerecent = useSetRecoilState(ScrollValue);
    const handleScroll = () => {
        // gets percentage scrolled (ie: 80 or NaN if tracklength == 0);
        var pctScrolled = Math.floor(window.scrollY / document.body.clientHeight * 100)
        setScrollPerecent(pctScrolled);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });
    return setScrollPerecent;
}

export function useScrollValue(ScrollSpeed, ScrollOffSet, SmallScreenOffset) {
    const scrollPercent = useRecoilValue(ScrollValue);

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
