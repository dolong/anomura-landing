import Head from "next/head";
import dynamic from "next/dynamic";
import { ShopZone } from "/containers/home/ContainerIndex";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/roadmap/index.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from "/atoms/Atoms";
import React, { useEffect, useState } from "react";
import { BufferLoader } from "utils/buffer-loader";
import { Navbar } from "@components/home/ComponentIndex";
import useDeviceDetect from "lib/useDeviceDetect";
import Roadmap from "/containers/home/Roadmap";
import ShareFooter from "/containers/common/ShareFooter";


// const { Roadmap, ShareFooter } = {

// 	Roadmap: dynamic(
// 		() => import("/containers/home/ContainerIndex").then((module) => module.Roadmap),
// 		{ ssr: false }
// 	),
// 	ShareFooter: dynamic(
// 		() => import("/containers/home/ContainerIndex").then((module) => module.ShareFooter),
// 		{ ssr: false }
// 	),
// };

export default function RoadMapMain() {
	const { isMobile } = useDeviceDetect();
	useEffect(() => {

	}, [isMobile]);
	return (
		<div className={s.app}>

			<div className={s.parallax_group}>
				<Navbar isMobile={isMobile} />
				<Roadmap />
				<ShareFooter isParalax={false} />
			</div>


			{/* Css modules cant have a none pure style in 
      		 /  it like body so making a JSS style here 
       		/  and applying it globally */}
			{/* <style>{`
        		body {
        		  overflow-x:hidden;
        		  font-size: clamp(18px,2vw,28px);
        		  font-family: Atlantis;
        		  color: #fff;
        		  line-height: 1.5;
        		}
      		`}
			</style> */}
		</div>
	);
}
