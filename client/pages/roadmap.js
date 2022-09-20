
import dynamic from "next/dynamic";
import s from "/sass/home/roadmap/index.module.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "@components/home/ComponentIndex";
import useDeviceDetect from "lib/useDeviceDetect";
import FloatingBottom from "containers/common/FloatingBottom";
import { Roadmap, ShareFooter } from "containers/home/ContainerIndex";

// should not dynamic here to prevent layout shift bug
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
			<FloatingBottom isMobile={isMobile} />

		</div>
	);
}
