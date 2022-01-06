import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollValue } from '/atoms/Atoms';

export function useScrollEvent() {

    const setScrollPercent = useSetRecoilState(ScrollValue);
    const handleScroll = () => {
        var pctScrolled = Math.floor(window.scrollY / document.body.clientHeight * 100)
        setScrollPercent(pctScrolled);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });
    return setScrollPercent;
}