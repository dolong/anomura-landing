import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Navbar } from "/components/home/ComponentIndex";
import { ShopZone } from "/containers/home/ContainerIndex";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/home.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from '/atoms/Atoms';
import { useEffect } from 'react';


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

  function StartAudio() {
    document.getElementById('bg-music').play();
    window.removeEventListener('click', StartAudio);
  }

  useEffect(() => {
    window.addEventListener('click', StartAudio);
  });

  return (
    <div className={s.App}>
      <Head>
        <title>Anomura Landing</title>
        <meta name="description" content="Anomura the next NFT game to take the world by storm." />
        <meta name="author" content="Jonathan Westfall" />
        <meta name="keywords" content="Anomura, NFT, Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <audio src="/audio/UnderwaterLoop.wav" type="audio/wav" id="bg-music" autoPlay loop>
      </audio>


      <img className={s.sunlight} src="/img/home/sunlight.png" alt="" />

      {/* Parallax Zone */}
      <div className={s.parallax_group}>
        <ShopZone  ></ShopZone>
        <NFT ScrollPercent={scrollPercent}></NFT>
        <CrabAnat ScrollPercent={scrollPercent}></CrabAnat>
        <WhenIsItOut ScrollPercent={scrollPercent}></WhenIsItOut>
        <Footer ScrollPercent={scrollPercent}></Footer>
      </div>
      {/* End Of Parallax Zone */}

      {/* Css modules cant have a none pure style in 
       /  it like body so making a JSS style here 
       /  and applying it globally */}
      <style >{`
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
