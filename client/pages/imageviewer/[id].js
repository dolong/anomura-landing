import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getBody, getClaws, getShell, getLegs, getBackground } from "utils/crabData";
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
        others: "/./img/imageviewer/Others/",
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    } else {
        console.log("building images");
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

    const [imagesSrc, setImageSrc] = React.useState({})
    const [isLoaded, setIsLoaded] = React.useState(false)
    const canvasRef = React.createRef(null);
    const canvasOtherRef = React.createRef(null);
    let canvas = null;
    let context = null;
    let canvasPos = {
        x: null,
        y: null,
    };

    useEffect(() => {
        if (canvasRef && isLoaded == false) {
            LoadImages(sources).done((images) => {
                console.log(images)
                setImageSrc(images);
                setIsLoaded(true)
            });
        }
    
        if(isLoaded == true){
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            canvasPos = {
                x: canvas.offsetLeft,
                y: canvas.offsetTop,
            };

            canvas.addEventListener("mousemove", OnMouseMoveInCanvas);
            DrawImagesOnCanvas(imagesSrc);
        }
    }, [imagesSrc]);

    const OnMouseMoveInCanvas = (e) => {
        let otherCanvas = canvasOtherRef?.current;
        let otherContext = otherCanvas?.getContext("2d");
        let mousePoint = {
            x: e.pageX - canvasPos.x,
            y: e.pageY - canvasPos.y,
        };
        let coords = document.getElementById("myCoords");

        coords.textContent = "(" + mousePoint.x + ", " + mousePoint.y + ")";
        if (mousePoint.x > 85 && mousePoint.y > 100) {
           // console.log(imagesSrc.others['normal'])
           otherContext.drawImage(imagesSrc.others['normal'], 0, 0, 124, 175);
        }
        else{
            console.log(34)
            otherContext.clearRect(0, 0, otherCanvas.width, otherCanvas.height);
        }
        
    };

    const DrawImagesOnCanvas =(images) => {
        canvas = canvasRef?.current;
        context = canvas?.getContext("2d");
        let counter = 0;
        setInterval(() => {
            if (counter == 24) counter = 0;
            context.drawImage(images.background[counter], 0, 0, 250, 250);
            context.drawImage(images.shell[counter], 0, 0, 250, 250);
            context.drawImage(images.legs[counter], 0, 0, 250, 250);
            context.drawImage(images.body[counter], 0, 0, 250, 250);
            context.drawImage(images.claws[counter], 0, 0, 250, 250);

            counter++;
        }, 100);
    }

    const LoadImages = (sources, onFinished) => {
        let imageLoaded = 0,
            i = 0,
            numImages = 0;
        const images = {
            background: [],
            shell: [],
            legs: [],
            body: [],
            claws: [],
            others: {
                normal: null
            },
        };
        var postaction = function () {};

        function onFinished() {
            imageLoaded++;
            console.log(imageLoaded);
            if (imageLoaded == 235) {
                // todo: fix here
                postaction(images);
            }
        }
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            for (let index = 0; index <= 23; index++) {
                if (src != "others") {
                    images[src][index] = new Image();
                    images[src][index].onload = function () {
                        if (++imageLoaded >= numImages) {
                            onFinished(images);
                        }
                    };
                    let counter = index + 1;

                    if (src == "background") // fixed here for all png images
                        images[src][index].src = sources[src] + "_" + counter + ".png";
                    else images[src][index].src = sources[src] + "_" + counter + ".svg";
                } else {
                    

                    images[src]['normal'] = new Image();
                    images[src]['normal'].onload = function () {
                        if (++imageLoaded >= numImages) {
                            onFinished(images);
                        }
                    };
                    images[src]['normal'].src = sources[src] + 'normalAttr' + '.png'

                }
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };
    return (
        <>
            <canvas ref={canvasRef} width="508" height="508" />
          <canvas ref={canvasOtherRef} width="508" height="508" style={{position: 'absolute', left: 350, top: 0}}/> 
            {/* <canvas ref={canvasOtherRef} width="508" height="508" /> */}
            <p id="myCoords"></p>
        </>
    );
};
