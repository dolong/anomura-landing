import Head from 'next/head';
import { Navbar, TreasureChest, Footer, SkyArea, SnowArea, LavaArea, PondArea } from "/containers/anomura/ContainerIndex";
import s from "/sass/anomura/anomura.module.css";
export default function Anomura() {
    return (
        <div className={s.app}>
            <Head>
                <title>Anomura Landing</title>
                <meta name="description" content="Anomura the next NFT game to take the world by storm." />
                <meta name="author" content="Jonathan Westfall" />
                <meta name="keywords" content="Anomura, NFT, Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Navbar */}

            {/* Sky Area */}
            <SkyArea></SkyArea>

            {/* Snow Area  */}

            {/* Lava Area */}

            {/* Pond Area */}

            {/* Treasure Chest */}

            {/* Footer */}
        </div>
    )
}
