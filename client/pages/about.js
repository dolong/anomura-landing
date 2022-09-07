import Head from "next/head";
import dynamic from "next/dynamic";
import { ShopZone } from "/containers/home/ContainerIndex";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/about.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from "/atoms/Atoms";
import React, { useEffect, useState } from "react";
import { Navbar } from "@components/home/ComponentIndex";


import useDeviceDetect from "lib/useDeviceDetect";

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
	return (
		<div className={s.app}>
			<div className={s.parallax_group}>
				<Navbar isMobile={isMobile} />
				<About />
				<ShareFooter isParalax={false} />
			</div>
		</div>
	);
}
