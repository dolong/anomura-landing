import React, { StrictMode } from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

import { SiteProvider } from "../context/SiteContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
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
        </SessionProvider>
    );
}

export default MyApp;
