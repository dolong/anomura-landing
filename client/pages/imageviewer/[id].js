import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getBody, getClaws, getShell, getLegs, getBackground } from "./data";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* order of layers to work: background, shells, legs, body, claws */
export default function ImageViewerDetails() {
    const router = useRouter();
    const { id } = router.query;
    const getCrabUrl = `https://anomura-landing.vercel.app/api/crabs/imageviewer/${id}`;

    const { data, error } = useSWR(id ? getCrabUrl : null, fetcher);
    
    let sources = {
        background: "/./img/imageviewer/Background/",
        shell: "/./img/imageviewer/Shell/",
        legs: "/./img/imageviewer/Legs/",
        body: "/./img/imageviewer/Body/",
        claws: "/./img/imageviewer/Claws/",
    };

    if (!data) return <div>Loading...</div>;
    else {
        console.log(data)
        const {background, body, claws, legs, shell} = data;
        sources.background = sources.background + getBackground(background);
        sources.shell = sources.shell + getShell(shell);
        sources.legs = sources.legs + getLegs(legs);
        sources.body = sources.body + getBody(body);
        sources.claws = sources.claws + getClaws(claws);

        return <CrabCanvas sources={sources} />;
        //return <SVGComponent data={data} />;
    }
}

const CrabCanvas = ({ sources  }) => {
    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;
    useEffect(() => {
        if (canvasRef) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            loadImages(sources).done((images) => {

                let counter = 0;
                setInterval(()=> {
                    context.drawImage(images.background[counter], 0, 0);
                    context.drawImage(images.shell[counter], 0, 0);
                    context.drawImage(images.legs[counter], 0, 0);
                    context.drawImage(images.body[counter], 0, 0);
                    context.drawImage(images.claws[counter], 0, 0);
                    if(counter == 23) counter=1;
                    counter++;
                }, 150)
                
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
            console.log(imageLoaded)
            if (imageLoaded == 236) { // todo: fix here
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
                let counter = index +1;
                images[src][index].src = sources[src] + "_" + counter + ".svg";
            }
        }

        return {
     
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };
    return <canvas ref={canvasRef} width="384" height="384" />;
};

const SVGComponent = ({ data }) => {
    const getImages = (category, srcPart) => {
        let values = "";
        console.log(srcPart);
        //** need to have / before source to get it work inside dynamic route */
        for (let i = 1; i <= 24; i++) {
            //values += `/./img/imageviewer/${category}/${srcPart}_${i}.svg;`;
            values += `/./img/imageviewer/Background/extras_vietnam_${i}.svg;`;
        }
        return (
            <image width="96" height="96">
                <animate
                    attributeName="xlink:href"
                    values={values}
                    begin="0s"
                    repeatCount="indefinite"
                    dur="2.5s"
                ></animate>
            </image>
        );
    };
    return (
        <>
            <svg
                width="300"
                height="300"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                {getImages("Background", "extras_vietnam")}

                {/* 
                {getImages("Background", getBackground(data.data.background))}
                {getImages("Shell", getShell(data.data.shell))}
                {getImages("Legs", getLegs(data.data.legs))}
                {getImages("Body", getBody(data.data.body))}
                {getImages("Claws", getClaws(data.data.claws))} */}
            </svg>
        </>
    );
};
