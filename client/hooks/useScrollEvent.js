import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollValue } from '/atoms/Atoms';

export function useScrollEvent() {

    const setScrollPercent = useSetRecoilState(ScrollValue);

    const handleScroll = () => {
        var pctScrolled = Math.floor(window.scrollY / document.body.clientHeight * 100)
        setScrollPercent(pctScrolled);
    };

    /* If the window is resize do a new calculation on scroll values
    /  just in case the screen changes to a new width breakpoint for the parallax scroll
    */
    const handleResize = () => {
        handleScroll();
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        }
    });
    return setScrollPercent;
}