import Head from 'next/head';
import { Navbar } from "/components/home/ComponentIndex";
import { CrabAnat, Footer, NFT, ShopZone, WhenIsItOut } from "/containers/home/ContainerIndex";

import { useScrollEvent } from "/lib/useScroll";
import s from "/sass/home/home.module.css";


export default function Home() {

  const setOffsetY = useScrollEvent();
  return (
    <div className={s.App}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* Top Nav Zone */}
      <img className={s.sunlight} src="/img/home/sunlight.png" alt="" />
      <Navbar s={s} ></Navbar>
      {/* End Of Top Nav Zone */}

      {/* Parallax Zone */}
      <div className={s.parallax_group}>
        <ShopZone s={s}></ShopZone>
        <NFT s={s}></NFT>
        <CrabAnat s={s}></CrabAnat>
        <WhenIsItOut s={s}></WhenIsItOut>
        <Footer s={s}></Footer>
      </div>
      {/* End Of Parallax Zone */}

      <style jsx global>{`
        body {
          overflow-x:hidden;
          font-size: clamp(18px,2vw,22px);
          font-family: Atlantis;
          color: #fff;
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}
