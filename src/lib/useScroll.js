import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export function useScrollEvent() {

    const setScrollPerecent = useSetRecoilState(ScrollValue);
    const handleScroll = () => {
        var pctScrolled = Math.floor(window.scrollY / document.body.clientHeight * 100)
        setScrollPerecent(pctScrolled);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });
    return setScrollPerecent;
}
/**
 * 
 * @param {Speed multiplier for scroll speed. This has to be a negative value.} ScrollSpeed 
 * @param {Offset that sets the initial position before any scrolling is done. } ScrollOffSet 
 * @param {This is additionally added if the screen is for tablets or smaller devices.} SmallScreenOffset 
 * @returns 
 */
export function useScrollValue(ScrollSpeed, ScrollOffSet, SmallScreenOffset) {
    const scrollPercent = useRecoilValue(ScrollValue);

    let calculatedOffsetY = 0;
    //Four seems to be the magic number for not stretching the scroll bar
    let scrollMultiplier = 4;

    if (window.innerWidth < 600) {
        scrollMultiplier = 2;
        calculatedOffsetY = Math.floor(ScrollOffSet + SmallScreenOffset + (scrollPercent * ScrollSpeed / scrollMultiplier));
        return calculatedOffsetY;
    }
    else if (window.innerWidth < 900) {
        scrollMultiplier = 4;
        calculatedOffsetY = Math.floor(ScrollOffSet + SmallScreenOffset + (scrollPercent * ScrollSpeed / scrollMultiplier));
        return calculatedOffsetY;
    }
    else if (window.innerWidth < 1200) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(ScrollOffSet + SmallScreenOffset + (scrollPercent * ScrollSpeed / scrollMultiplier));
        return calculatedOffsetY;
    }

    calculatedOffsetY = Math.floor(ScrollOffSet + (scrollPercent * ScrollSpeed / scrollMultiplier));
    return calculatedOffsetY;
}
