import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export function useScroll() {

    const setOffsetY = useSetRecoilState(ScrollValue);
    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });


    return setOffsetY;
}