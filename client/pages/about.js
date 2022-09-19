
import dynamic from "next/dynamic";
import s from "/sass/home/about/index.module.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "@components/home/ComponentIndex";
import useDeviceDetect from "lib/useDeviceDetect";
import FloatingBottom from "containers/common/FloatingBottom";

const { About, ShareFooter } = {
	About: dynamic(
		() => import("/containers/home/ContainerIndex").then((module) => module.About),
		{ ssr: false }
	),
	ShareFooter: dynamic(
		() => import("/containers/home/ContainerIndex").then((module) => module.ShareFooter),
		{ ssr: false }
	),
};
export default function AboutMain() {
	const { isMobile } = useDeviceDetect();
	useEffect(() => {

	}, [isMobile]);

	console.log(isMobile)
	return (
		<div className={s.app}>
			<div className={s.parallax_group}>
				<Navbar isMobile={isMobile} />
				<About />
				<ShareFooter isParalax={false} />
			</div>
			<FloatingBottom isMobile={isMobile} />
		</div>
	);
}
