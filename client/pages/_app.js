import React, { StrictMode } from "react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

import { SiteProvider } from "../context/SiteContext";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";

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

    return (
        <SiteProvider>
            <RecoilRoot>
                <StrictMode>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <Head>
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
                        {/* <Script
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-XXXXXXX', {
                                  page_path: window.location.pathname,
                                });
                            `,
                            }}
                        /> */}
                    </Head>
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
