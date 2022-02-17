import Head from "next/head";
import dynamic from "next/dynamic";
import { ShopZone } from "/containers/home/ContainerIndex";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/home.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from "/atoms/Atoms";
import React, { useEffect, useState } from "react";
import { BufferLoader } from "utils/buffer-loader";

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
    const [audioState, setAudioState] = useState("unloaded");

    const [audioControl, setAudioControl] = useState({
        audioContext: null,
        bufferList: null,
        audioMaps: {},
        bgMusic: {
            isPlaying: false,
        },
        chestOpen: {},
        // fishPass: {},
    });

    function LoadAudios() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        bufferLoader = new BufferLoader(
            audioContext,
            [
                "/audio/Underwater Loop Deep.wav",
                "/audio/Chest Open.wav",
                "/audio/Fish Pass by 1.wav",
                "/audio/chest chime.wav",
                "/audio/Constant Bubble Loop.wav"
            ],
            onFinishedLoadingAudioSource
        );

        bufferLoader.load();
    }
    const PlayBackgroundMusic = () => {
        window.removeEventListener("click", PlayBackgroundMusic);
        if (audioControl.bgMusic.isPlaying == false) {
            console.log(audioControl.bgMusic);
            if (typeof audioControl.bgMusic.playSound === "function") {

                audioControl.bgMusic.playSound();
                audioControl.chestChime.playSound();
                audioControl.bubble.playSound();

                setAudioControl((prevState) => ({
                    ...prevState,
                    bgMusic: {
                        ...prevState.bgMusic,
                        isPlaying: true,
                    },
                }));
            }
        }
    };

    useEffect(() => {
        if (audioState == "unloaded") {
            LoadAudios();
        }

        window.addEventListener("click", PlayBackgroundMusic);
        return () => {};
    }, [audioState]);

    const onFinishedLoadingAudioSource = (bufferList) => {
        setAudioControl({
            audioContext,
            bufferList,
            bgMusic: {
                playSound: function () {
                    let source = audioContext.createBufferSource();
                    source.buffer = bufferList[0];
                    source.connect(audioContext.destination);
                    source.loop = true;
                    source.start(0);
                },
                isPlaying: false,
            },
            chestOpen: {
                playSound: function () {
                    let source = audioContext.createBufferSource();
                    source.buffer = bufferList[1];
                    source.connect(audioContext.destination);
                    source.start(0);
                },
            },
            fishPass: {
                sourceF: null,
                gainNodeF: null,
                playSound: function () {
                    console.log("play fish");
                    this.sourceF = audioContext.createBufferSource();
                    if (this.gainNodeF == null) {
                        this.gainNodeF = audioContext.createGain(); // to not reset the volume next time we play
                    }
                    this.sourceF.buffer = bufferList[2];
                    this.sourceF.connect(this.gainNodeF).connect(audioContext.destination);
                    this.sourceF.start(0);
                },
                setVolume: function (val) {
                    if (this.sourceF && this.gainNodeF) {
                        this.gainNodeF.gain.value = val;
                    }
                },
            },
            chestChime: {
                source: null,
                gainNode: null,
                playSound: function () {
                    this.source = audioContext.createBufferSource();
                    if (this.gainNode == null) {
                        this.gainNode = audioContext.createGain(); // to not reset the volume next time we play
                    }
                    this.source.buffer = bufferList[3];
                    this.source.connect(this.gainNode).connect(audioContext.destination);
                    this.source.loop = true;
                    this.gainNode.gain.value = 0; // initially should not play too loud
                    this.source.start(0);
                },
                stop: function () {
                    if (this.source) {
                        this.source.stop();
                    }
                },
                setVolume: function (val) {
                    if (this.source && this.gainNode) {
                        this.gainNode.gain.value = val;
                    }
                },
            },
            bubble: {
                sourceB: null,
                gainNodeB: null,
                playSound: function () {
                    this.sourceB = audioContext.createBufferSource();
                    if (this.gainNodeB == null) {
                        this.gainNodeB = audioContext.createGain();
                    }
                    this.sourceB.buffer = bufferList[4];
                    this.sourceB.connect(this.gainNodeB).connect(audioContext.destination);
                    this.sourceB.loop = true;
                    this.gainNodeB.gain.value = 0; // initially should not play too loud
                    this.sourceB.start(0);
                },
                setVolume: function (val) {
                    if (this.sourceB && this.gainNodeB) {
                        // console.log("set bubble volume " + val)
                        this.gainNodeB.gain.value = val;
                    }
                },
            },
        });

        setAudioState("loaded");
        console.log("Audio loaded successfully");
    };

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

                <NFT ScrollPercent={scrollPercent} audioControl={audioControl}></NFT>
                <CrabAnat ScrollPercent={scrollPercent}></CrabAnat>
                <WhenIsItOut
                    ScrollPercent={scrollPercent}
                    audioControl={audioControl}
                ></WhenIsItOut>
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
