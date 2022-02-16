import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBody, getClaws, getShell, getLegs, getBackground } from "../../../utils/crabData";
import { getAllCrabs, getCrabById } from "repositories/crabs";

/** static props and paths should not call to api link since it is not available on build time */
export const getStaticPaths = async () => {
    let allCrabs = await getAllCrabs();
    const paths = allCrabs.map((p) => {
        return {
            params: { id: p.crabId.toString() },
        };
    });

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const id = parseInt(context.params.id);
    const data = await getCrabById(id);
    return {
        props: { data },
        revalidate: 60,
    };
};

/* order of layers to work: background, shells, legs, body, claws */
export default function AnimateViewerDetails({ data }) {
    const router = useRouter();

    let sources = {
        background: "/./img/imageviewer/Background/",
        shell: "/./img/imageviewer/Shell/",
        legs: "/./img/imageviewer/Legs/",
        body: "/./img/imageviewer/Body/",
        claws: "/./img/imageviewer/Claws/",
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    } else {
        const { background, body, claws, legs, shell } = data;
        
        sources.background = sources.background + getBackground(background);
        sources.shell = sources.shell + getShell(shell);
        sources.legs = sources.legs + getLegs(legs);
        sources.body = sources.body + getBody(body);
        sources.claws = sources.claws + getClaws(claws);

        return <CrabCanvas sources={sources} />;
    }
}

const CrabCanvas = ({ sources }) => {
    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;
    useEffect(() => {
        if (canvasRef) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");

            loadImages(sources).done((images) => {
                let counter = 0;
                setInterval(() => {
                    context.drawImage(images.background[counter], 0, 0, 300, 300);
                    context.drawImage(images.shell[counter], 0, 0, 300, 300);
                    context.drawImage(images.legs[counter], 0, 0, 300, 300);
                    context.drawImage(images.body[counter], 0, 0, 300, 300);
                    context.drawImage(images.claws[counter], 0, 0, 300, 300);
                    if (counter == 23) counter = 1;
                    counter++;
                }, 120);
            });
        }
    }, []);

    const loadImages = (sources, onFinished) => {
        let imageLoaded = 0,
            i = 0,
            numImages = 0;
        const images = {
            background: [],
            shell: [],
            legs: [],
            body: [],
            claws: [],
        };
        var postaction = function () {};

        function onFinished() {
            imageLoaded++;
            console.log(imageLoaded);
            if (imageLoaded == 236) {
                // todo: fix here
                postaction(images);
            }
        }
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            for (let index = 0; index <= 23; index++) {
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                let counter = index + 1;
                images[src][index].src = sources[src] + "_" + counter + ".svg";
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };
    return <canvas ref={canvasRef} width="300" height="300" />;
};
