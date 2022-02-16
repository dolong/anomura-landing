import Head from "next/head";
import dynamic from "next/dynamic";
import { ShopZone } from "/containers/home/ContainerIndex";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/home.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from "/atoms/Atoms";
import React, { useEffect, useState } from "react";
import {BufferLoader} from "utils/buffer-loader"


const { NFT, CrabAnat, WhenIsItOut, Footer } = {
    NFT: dynamic(() => import("/containers/home/ContainerIndex").then((module) => module.NFT), {
        ssr: false,
    }),
    CrabAnat: dynamic(
        () => import("/containers/home/ContainerIndex").then((module) => module.CrabAnat),
        { ssr: false }
    ),
    WhenIsItOut: dynamic(
        () => import("/containers/home/ContainerIndex").then((module) => module.WhenIsItOut),
        { ssr: false }
    ),
    Footer: dynamic(
        () => import("/containers/home/ContainerIndex").then((module) => module.Footer),
        { ssr: false }
    ),
};

export default function Home() {

    const setOffsetY = useScrollEvent();
    const scrollPercent = useRecoilValue(ScrollValue);
    let bufferLoader, audioContext;

    const [audioControl, setAudioControl] = useState({
        bgMusic:{},
        chestOpen:{}
    })

    function LoadAudios() {

        // let bgMusic = document.getElementById("bg-music");
        // bgMusic.play();
        // window.removeEventListener("click", StartAudio);
        // loadChestChime();
        //window.removeEventListener("scroll", StartAudio);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        bufferLoader = new BufferLoader(
            audioContext,
            [
              '/audio/Underwater Loop Deep.wav',
              '/audio/Chest Open.wav',
            ],
            onFinishedLoadingAudioSource
            );
        
          bufferLoader.load();
    }

    // const loadChestChime = () => {
    //     let chestChime = document.getElementById("chest-chime");
    //     chestChime.muted = true;
    //     chestChime.play();
    // };

    useEffect(() => {
        window.addEventListener("click", LoadAudios);
        //window.addEventListener("scroll", StartAudio);
        if(audioControl.bgMusic.music){
            audioControl.bgMusic.music?.start(0) 
        }
        return () => {};
    }, [audioControl]);

    const onFinishedLoadingAudioSource = (bufferList) => {
        let bgMusic = audioContext.createBufferSource();
        let bgVolume = audioContext.createGain();
        bgMusic.buffer = bufferList[0];
        bgMusic.connect(bgVolume).connect(audioContext.destination);
        //bgVolume.gain.value = 0.1

        let chestOpen = audioContext.createBufferSource(); 
        let chestOpenVolume = audioContext.createGain();
        chestOpen.buffer = bufferList[1];
        chestOpen.connect(chestOpenVolume.connect(audioContext.destination))

        setAudioControl({
            bgMusic:{
                music: bgMusic,
                gain: bgVolume.gain
            },
            chestOpen:{
                music: chestOpen,
                gain: chestOpenVolume.gain
            }
        })
     
      }

    return (
        <div className={s.App}>
            <Head>
                <title>Anomura Landing</title>
                <meta
                    name="description"
                    content="Anomura the next NFT game to take the world by storm."
                />
                <meta name="author" content="Jonathan Westfall" />
                <meta name="keywords" content="Anomura, NFT, Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <audio src={audioSource} type="audio/wav" id="bg-music" autoPlay loop />
            <audio src="/audio/chest chime.wav" type="audio/wav" loop id="chest-chime" /> */}

            <img className={s.sunlight} src="/img/home/sunlight.png" alt="" />

            {/* Parallax Zone */}
            <div className={s.parallax_group}>
                <ShopZone />
               
                <NFT ScrollPercent={scrollPercent}></NFT>
                <CrabAnat ScrollPercent={scrollPercent}></CrabAnat>
                <WhenIsItOut ScrollPercent={scrollPercent}></WhenIsItOut>
                <Footer ScrollPercent={scrollPercent}></Footer>
                
            </div>
            {/* End Of Parallax Zone */}

            {/* Css modules cant have a none pure style in 
       /  it like body so making a JSS style here 
       /  and applying it globally */}
            <style>{`
        body {
          overflow-x:hidden;
          font-size: clamp(18px,2vw,28px);
          font-family: Atlantis;
          color: #fff;
          line-height: 1.5;
        }
      `}</style>
        </div>
    );
}
