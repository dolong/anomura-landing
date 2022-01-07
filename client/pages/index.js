import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Navbar } from "/components/home/ComponentIndex";
import { ShopZone } from "/containers/home/ContainerIndex";

import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/home.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from '/atoms/Atoms';


const { NFT, CrabAnat, WhenIsItOut, Footer }
  = {
  NFT: dynamic(() =>
    import("/containers/home/ContainerIndex").then(module => module.NFT), { ssr: false }
  ),
  CrabAnat: dynamic(() =>
    import("/containers/home/ContainerIndex").then(module => module.CrabAnat), { ssr: false }
  ),
  WhenIsItOut: dynamic(() =>
    import("/containers/home/ContainerIndex").then(module => module.WhenIsItOut), { ssr: false }
  ),
  Footer: dynamic(() =>
    import("/containers/home/ContainerIndex").then(module => module.Footer), { ssr: false }
  )
}

export default function Home() {

  const setOffsetY = useScrollEvent();
  const scrollPercent = useRecoilValue(ScrollValue);

  return (
    <div className={s.App}>
      <Head>
        <title>Anomura Landing</title>
        <meta name="description" content="Anomura the next NFT game to take the world by storm." />
        <meta name="author" content="Jonathan Westfall" />
        <meta name="keywords" content="Anomura, NFT, Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      {/* Top Nav Zone */}
      <img className={s.sunlight} src="/img/home/sunlight.png" alt="" />
      <Navbar s={s} ></Navbar>
      {/* End Of Top Nav Zone */}

      {/* Parallax Zone */}
      <div className={s.parallax_group}>
        <ShopZone s={s}></ShopZone>
        <NFT s={s} ScrollPercent={scrollPercent}></NFT>
        <CrabAnat s={s} ScrollPercent={scrollPercent}></CrabAnat>
        <WhenIsItOut s={s} ScrollPercent={scrollPercent}></WhenIsItOut>
        <Footer s={s} ScrollPercent={scrollPercent}></Footer>
      </div>
      {/* End Of Parallax Zone */}

      {/* Css modules cant have a none pure style in 
       /  it like body so making a JSS style here 
       /  and applying it globally */}
      <style jsx global>{`
        body {
          overflow-x:hidden;
          font-size: clamp(18px,2vw,28px);
          font-family: Atlantis;
          color: #fff;
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}
