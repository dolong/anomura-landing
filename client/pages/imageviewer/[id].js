import React, { useEffect } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";
import { useRouter } from "next/router";
import { getBody, getClaws, getShell, getLegs, getBackground } from "utils/crabData";
import { getAllCrabs, getCrabById } from "repositories/crabs";
import { CrabViewModal } from "/containers/imageviewer/ContainerIndex";

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
        // console.log(data);
        const { background, body, claws, legs, shell } = data;

        sources.background = sources.background + getBackground(background);
        sources.shell = sources.shell + getShell(shell);
        sources.legs = sources.legs + getLegs(legs);
        sources.body = sources.body + getBody(body);
        sources.claws = sources.claws + getClaws(claws);

        return <CrabCanvas sources={sources} data={data} />;
    }
}

const CrabCanvas = ({ sources, data }) => {
    const [imagesSrc, setImageSrc] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);

    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;

    useEffect(() => {
        if (canvasRef && isLoaded == false) {
            LoadImages(sources).done((images) => {
                console.log(images);
                setImageSrc(images);
                setIsLoaded(true);
            });
        }

        if (isLoaded == true) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            canvasPos = {
                x: canvas.offsetLeft,
                y: canvas.offsetTop,
            };

            //canvas.addEventListener("mousemove", OnMouseMoveInCanvas);
            DrawImagesOnCanvas(imagesSrc);
        }
    }, [imagesSrc]);

    const DrawImagesOnCanvas = (images) => {
        canvas = canvasRef?.current;
        context = canvas?.getContext("2d");
        let width = 508;
        let height = 508;
        let counter = 0;

        setInterval(() => {
            if (counter == 24) counter = 0;
            context.drawImage(images.background[counter], 0, 0, width, height);
            context.drawImage(images.shell[counter], 0, 0, width, height);
            context.drawImage(images.headpieces[counter], 0, 0, width, height);
            context.drawImage(images.legs[counter], 0, 0, width, height);
            context.drawImage(images.body[counter], 0, 0, width, height);
            context.drawImage(images.claws[counter], 0, 0, width, height);

            counter++;
        }, 100);
    };

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
            headpieces: [],
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
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                let counter = index + 1;

                if (src == "background")
                    // fixed here for all png images
                    images[src][index].src = sources[src] + "_" + counter + ".png";
                else images[src][index].src = sources[src] + "_" + counter + ".svg";
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };

    return (
        <div className={s.container}>
            <canvas ref={canvasRef} width="508" height="508" />
            <img
                onClick={() => setModalOpen(!modalOpen)}
                className={s.toggleModal}
                src="/img/imageviewer/Others/bowl.svg"
            />
            {modalOpen && <CrabViewModal data={data} setModalOpen={setModalOpen} />}
            <style>
                {`
                        body {
                            font-family: Atlantis;
                            font-size:36px;
                            color:white;
                    }`}
            </style>
        </div>
    );
};
