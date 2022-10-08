import React, { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

import { AudioProvider } from "@context/AudioContext";
import { Web3ContextProvider } from "@context/Web3Context";
// import { Web3Provider } from "@ethersproject/providers";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
// import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";

import { SessionProvider } from "next-auth/react"

function getLibrary(provider) {
    // const library = new Web3Provider(provider);
    // library.pollingInterval = 12000
    // return library;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    React.useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    const handleRouteComponent = (Component) => {
        if (Component.isHomePage == true) {
            return (
                <AudioProvider>
                    <Component {...pageProps} />
                </AudioProvider>
            )
        } else if (Component.needWeb3Provider == true) {
            return (
                // <Web3ReactProvider getLibrary={getLibrary}>

                <Web3ContextProvider>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                    </SessionProvider>
                </Web3ContextProvider>

                // </Web3ReactProvider>
            )
        } else {
            return <Component {...pageProps} />;
        }
    };

    return (
        <StrictMode>

            <RecoilRoot>

                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    />
                    <Script strategy="afterInteractive">
                        {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                page_path: window.location.pathname,
                                });
                            `}
                    </Script>
                </>

                {handleRouteComponent(Component)}

            </RecoilRoot>

        </StrictMode>
    );
}

export default MyApp;
