import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ScrollValue } from 'Atom/Atoms';

export function useScrollEvent() {

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


export function useScrollValue(ScrollSpeed, ScrollOffSet) {
    const scrollValue = useRecoilValue(ScrollValue);
    const scrollSpeed = ScrollSpeed;
    let calculatedOffsetY = 0;
    const scrollOffset = ScrollOffSet;


    function calculateScrollValues() {
        calculatedOffsetY = scrollOffset + (scrollValue * scrollSpeed);
    }

    calculateScrollValues();

    return calculatedOffsetY;
}