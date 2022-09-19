import useSound from "lib/useSound";
import React, { useState } from "react";

export const SiteContext = React.createContext();

export function SiteProvider({ children }) {
    const [audioControl, isAudioLoaded, turnSound] = useSound();

    return (
        <SiteContext.Provider value={{ audioControl, isAudioLoaded, turnSound }}>
            {children}
        </SiteContext.Provider>
    );
}
