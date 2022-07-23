import useSWR from "swr";
import React, { useState, useEffect, useLayoutEffect } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json());
import s from "/sass/imageviewer/gallery.module.css";

const loadingItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]
export default function GalleryViewerIndex() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data, error } = useSWR(`/api/crabs?page=${pageIndex}`, fetcher);

    useEffect(() => { });
    ;
    if (error) console.log(error);
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.content_logo}>
                        <img src="/img/gallery/logo-pink.png" alt="AnomuraLogo" onClick={() => window.open(`https://anomuragame.com`, "_blank")} />
                    </div>
                    <div className={s.content_title}>The Cove Awaits You...</div>
                    <div className={s.content_paragraph}>
                        <div>Play as an Anomura, guardian of all creatures, and battle aenemies who threaten the realms:</div>
                        <div> Ocean, Earth, Sky, and Science. Utilize the Infinity Circle to your advantage by</div>
                        <div>unlocking cards, gearing up, and finding loot!</div>
                    </div>
                    <div className={s.content_paragraph}>Follow us for the latest updates in the Cove.</div>

                    <div className={s.content_paragraph}>Uncover the secrets of the Universe and restore balance to the four Realms.</div>

                </div>
                <div className={s.socials}>
                    <div className={s.socials_wrapper}>
                        <div
                            className={s.socials_wrapper_icon}
                            onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")}
                        >
                            <img src="/img/gallery/Twitter Icon.png" />
                            <img src={"/img/gallery/hexagon_outline.png"} />
                        </div>
                        <div
                            className={s.socials_wrapper_icon}
                            onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")}
                        >
                            <img src="/img/gallery/Discord Icon.png" />
                            <img src={"/img/gallery/hexagon_outline.png"} />
                        </div>
                        <div
                            className={s.socials_wrapper_icon}
                            onClick={() => window.open(`https://medium.com/@anomura`, "_blank")}
                        >
                            <img src="/img/gallery/Medium Icon.png" />
                            <img src={"/img/gallery/hexagon_outline.png"} />
                        </div>
                        {/* <img src="/img/gallery/Twitter Icon.png" onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")} /> */}
                        {/* <img src="/img/gallery/Discord Icon.png" onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")} /> */}
                        {/* <img src="/img/gallery/Medium Icon.png" onClick={() => window.open(`https://medium.com/@anomura`, "_blank")} /> */}
                    </div>
                </div>
                <div className={s.grid}>

                    {!data && loadingItems?.map((item, index) => {
                        return (
                            <div key={index} className={s.grid_image_loading}>

                                <img src="/img/gallery/loading-27.gif" alt="" />

                            </div>
                        );
                    })}
                    {data?.map((anomura, index) => {
                        return (
                            <div key={index}>
                                <a
                                    href={`${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/${anomura.crabId}`}
                                    target="_blank"
                                    className="text-red-200"
                                >
                                    <img className={s.grid_image} src={anomura.image} alt="" />
                                </a>
                            </div>
                        );
                    })}
                </div>
                <div className={s.arrows}>
                    <div className={s.arrows_wrapper}>
                        <img onClick={() => setPageIndex(pageIndex - 1)} src={pageIndex === 0 ? `/img/gallery/Arrow Left_Gray.png` : `/img/gallery/Arrow Left_Blue.png`} />
                        <img onClick={() => setPageIndex(pageIndex + 1)} src={pageIndex === 10 ? `/img/gallery/Arrow Right_Gray.png` : `/img/gallery/Arrow Right_Blue.png`} />

                    </div>
                </div>
            </div>
        </div >
    );
}


{/* <div className="text-lg font-bold">Anomura: {anomura.crabId}</div>
                                <div className="text-lg break-words">
                                    Background: {anomura.background}
                                </div>
                                <div className="text-lg break-words">Body: {anomura.body}</div>
                                <div className="text-lg break-words">Claws: {anomura.claws}</div>
                                <div className="text-lg break-words">Legs: {anomura.legs}</div>
                                <div className="text-lg break-words">Shells: {anomura.shell}</div>
                                {anomura.headpieces != " " && (
                                    <div className="text-lg break-words">
                                        Headpiece: {anomura.headpieces}
                                    </div>
                                )} */}