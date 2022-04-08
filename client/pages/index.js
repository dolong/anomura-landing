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
		isSoundOn: false,
		audioContext: null,
		bufferList: null,
		audioMaps: {},
		bgMusic: {
			isPlaying: false,
		},
		chestOpen: {},
		fishPass: {},
	});

	function LoadAudios() {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();
		bufferLoader = new BufferLoader(
			audioContext,
			[
				"/audio/Underwater DEEP Fixed.wav",
				"/audio/Chest Open.wav",
				"/audio/Fish Pass by 1.wav",
				"/audio/chest chime.wav",
				"/audio/Constant Bubble Loop.wav",
			],
			onFinishedLoadingAudioSource
		);

		bufferLoader.load();
	}
	const PlayBackgroundMusic = () => {
		if (audioControl.bgMusic.isPlaying == false) {
			if (typeof audioControl.bgMusic.playSound === "function") {
				if (audioControl.isSoundOn) {
					audioControl.bgMusic.playSound();
				}

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
		} else {
			PlayBackgroundMusic();
		}
		return () => {};
	}, [audioState]);

	const onFinishedLoadingAudioSource = (bufferList) => {
		setAudioControl((prevState) => ({
			...prevState,
			setSound: function (val) {
				if (val === false) {
					this.bgMusic.setVolume(0);
					this.fishPass.setVolume(0);
				} else {
					// this.bgMusic.playSound();
					this.bgMusic.playSound(0.5);
				}
			},

			bufferList,
			bgMusic: {
				source: audioContext.createBufferSource(),
				gainNode: audioContext.createGain(),
				playSound: function () {
					this.source = audioContext.createBufferSource();
					if (this.gainNode == null) {
						this.gainNode = audioContext.createGain(); // to not reset the volume next time we play
					}

					this.source.buffer = bufferList[0];
					this.source.connect(this.gainNode).connect(audioContext.destination);
					this.source.loop = true;
					this.source.start(0);
					this.gainNode.gain.value = 0.5;
				},
				isPlaying: false,
				setVolume: function (val) {
					if (val === 0) {
						let counter = 0;
						let interval = setInterval(() => {
							this.gainNode.gain.value = this.gainNode.gain.value - 0.1;
							counter++;
							if (counter == 5) {
								clearInterval(interval);
							}
						}, 100);
						return;
					} else if (val === 1) {
						let counter = 0;
						let interval = setInterval(() => {
							this.gainNode.gain.value = this.gainNode.gain.value + 0.1;
							counter++;
							if (counter == 5) {
								clearInterval(interval);
							}
						}, 100);
					}
				},
			},
			chestOpen: {
				source: null,
				gainNode: null,
				playSound: function (volumeVal = 0) {
					this.source = audioContext.createBufferSource();
					this.source.buffer = bufferList[1];
					this.gainNode = audioContext.createGain();
					this.gainNode.gain.value = volumeVal;
					this.source.connect(this.gainNode).connect(audioContext.destination);
					this.source.start(0);
				},
			},
			fishPass: {
				sourceF: null,
				gainNodeF: null,
				playSound: function (volumeVal = 0) {
					this.sourceF = audioContext.createBufferSource();
					if (this.gainNodeF == null) {
						this.gainNodeF = audioContext.createGain(); // to not reset the volume next time we play
						this.gainNodeF.gain.value = volumeVal;
					}
					this.sourceF.buffer = bufferList[2];
					this.sourceF.connect(this.gainNodeF).connect(audioContext.destination);
					this.sourceF.start(0);
				},
				setVolume: function (val) {
					if (this.gainNodeF) {
						if (this.sourceF && this.gainNodeF) {
							this.gainNodeF.gain.value = val;
						}
					}
				},
			},
			chestChime: {
				source: null,
				gainNode: null,
				shouldPlay: true,
				playSound: function () {
					if (!this.shouldPlay) {
						return;
					}
					this.source = audioContext.createBufferSource();
					if (this.gainNode == null) {
						// to not reset the volume next time we play
						this.gainNode = audioContext.createGain();
					}
					this.source.buffer = bufferList[3];
					this.source.connect(this.gainNode).connect(audioContext.destination);
					this.source.loop = true;
					this.gainNode.gain.value = 0; // initially should not play too loud
					this.source.start(0);
				},
				stop: function () {
					this.shouldPlay = false;
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
					this.gainNodeB.gain.value = 0;
					this.sourceB.start(0);
				},
				setVolume: function (val) {
					if (!audioControl.isSoundOn && this.gainNodeB) {
						this.gainNodeB.gain.value = 0;
						return;
					}
					if (this.sourceB && this.gainNodeB) {
						this.gainNodeB.gain.value = val;
					}
				},
			},
		}));

		setAudioState("loaded");
		console.log("Audio loaded");
	};

	return (
		<div className={s.App}>
			<Head>
				<title>Anomura</title>
				<meta
					name="description"
					content="Anomura the next NFT game to take the world by storm."
				/>
				<meta name="author" content="Jonathan Westfall" />
				<meta name="keywords" content="Anomura, NFT, Game" />
				<link rel="icon" href="/img/favicons/faviconShell.png" />
			</Head>

			<img className={s.sunlight} src="/img/home/sunlight.png" alt="" />

			{/* Parallax Zone */}
			<div className={s.parallax_group}>
				<ShopZone audioControl={audioControl} setAudioControl={setAudioControl} />

				<NFT ScrollPercent={scrollPercent} audioControl={audioControl}></NFT>
				<CrabAnat ScrollPercent={scrollPercent}></CrabAnat>
				<WhenIsItOut
					ScrollPercent={scrollPercent}
					audioControl={audioControl}
				></WhenIsItOut>
				<Footer ScrollPercent={scrollPercent} audioControl={audioControl}></Footer>
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
