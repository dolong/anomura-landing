import Inventory from "@components/inventory/Inventory";
import Head from "next/head";
import React from "react";

function InventoryPage() {
    return (
        <>
            <Head>
                <title>Anomura | The Inventory</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Anomura | The Inventory" />
                <meta
                    property="og:description"
                    content="See what you have got?"
                />
                {/* <meta property="og:image"
                    content="/mint/Website Preview_V2.png"
                /> */}
                <meta
                    property="og:site_name"
                    content="Anomura | The Inventory"
                />
                <meta property="keywords" content="Anomura, NFT, Game, Anomura Mint" />

                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta
                    property="twitter:image"
                    content="/mint/Website Preview_V2.png"
                /> */}
                {/* <link rel="icon" href="/mint/faviconShell.png" /> */}
            </Head>
            {process.env.NEXT_PUBLIC_IS_INVENTORY_ENABLED == "true" ?
                (
                    <Inventory />
                ) : <div>Nothing here</div>
            }

        </>
    );
}
InventoryPage.needWeb3Provider = true;
export default InventoryPage;
