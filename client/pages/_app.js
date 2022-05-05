import React, { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

import { SiteProvider } from "../context/SiteContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SiteProvider>
            <RecoilRoot>
                <StrictMode>
                    {Component.Layout ? (
                        <Component.Layout>
                            <Component {...pageProps} />
                        </Component.Layout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </StrictMode>
            </RecoilRoot>
        </SiteProvider>
    );
}

export default MyApp;
