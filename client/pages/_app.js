import React, { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react"
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
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
        </SessionProvider>
    );
}

export default MyApp;
