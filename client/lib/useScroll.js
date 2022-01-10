/**
 * 
 * @param {Speed multiplier for scroll speed. This has to be a negative value.} ScrollSpeed 
 * @param {Offset that sets the initial position before any scrolling is done. } ScrollOffSet 
 * @param {This is additionally added if the screen is for tablets or similar devices.} SmallScreenOffset 
 * @param {This is additionally added if the screen is for on mobile devices} MicroScreenOffset
 * @returns 
 */
export function useScrollValue(ScrollPercent, ScrollSpeed, ScrollOffSet, SmallScreenOffset, MicroScreenOffset = 0,) {
    const scrollPercent = ScrollPercent;
    let calculatedOffsetY = 0;
    //Four seems to be the magic number for not stretching the scroll bar
    let scrollMultiplier = 4;


    if (window.innerWidth < 600) {
        scrollMultiplier = 3; // originally was 2
        calculatedOffsetY = Math.floor(ScrollOffSet + SmallScreenOffset + MicroScreenOffset + (scrollPercent * ScrollSpeed / scrollMultiplier));
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

