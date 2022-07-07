import React, { useEffect } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";
import { useRouter } from "next/router";
import { getAllCrabs, getAnomuraById } from "repositories/crabs";
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
    const data = await getAnomuraById(id);
    return {
        props: { data: JSON.parse(JSON.stringify(data)), key: id },
        revalidate: 60,
    };
};

/* order of layers to work: background, shadow, shells, headpieces, legs, body, claws */
export default function AnimateViewerDetails({ data }) {
    const router = useRouter();
    let sources = {
        background: "/./img/imageviewer/Background/",
        shell: "/./img/imageviewer/Shell/",
        legs: "/./img/imageviewer/Legs/",
        body: "/./img/imageviewer/Body/",
        claws: "/./img/imageviewer/Claws/",
        headpieces: "/./img/imageviewer/HeadPieces/",
        shadow: "/./img/imageviewer/Services/shadow",
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    } else {
        if (!data) {
            return <div>Failed to load this anomuras</div>;
        }
        const { background, body, claws, legs, shell, headpieces } = data;

        sources.background = sources.background + background;
        sources.shell = sources.shell + shell;
        sources.legs = sources.legs + legs;
        sources.body = sources.body + body;
        sources.claws = sources.claws + claws;
        sources.headpieces = sources.headpieces + headpieces;

        let isDrawHeadpieces = headpieces.toString().trim() !== "";
        return <CrabCanvas sources={sources} data={data} isDrawHeadpieces={isDrawHeadpieces} />;
    }
}

const CrabCanvas = ({ sources, data, isDrawHeadpieces }) => {
    const router = useRouter();
    const { id } = router.query;

    const [imagesSrc, setImageSrc] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);

    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;

    useEffect(() => {
        if (canvasRef && isLoaded == false) {
            LoadImages(sources).done((images) => {
                setImageSrc(images);
                setIsLoaded(true);
            });
        }

        if (isLoaded == true) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
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
            context.drawImage(images.shadow[counter], 0, 0, width, height);
            context.drawImage(images.shell[counter], 0, 0, width, height);
            isDrawHeadpieces && context.drawImage(images.headpieces[counter], 0, 0, width, height);
            context.drawImage(images.legs[counter], 0, 0, width, height);
            context.drawImage(images.body[counter], 0, 0, width, height);
            context.drawImage(images.claws[counter], 0, 0, width, height);

            counter++;
        }, 150);
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
            shadow: [],
        };
        var postaction = function () { };

        // 24 frames per part, we have 7 parts ~ 24 * 7 = 168
        function onFinished() {
            if (imageLoaded == 144 && isDrawHeadpieces === false) {
                postaction(images);
            }
            if (imageLoaded == 168) {
                postaction(images);
            }
        }
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            if (src == "headpieces" && isDrawHeadpieces === false) {
                console.log("no headpiece to draw");
                continue;
            }
            for (let index = 0; index <= 23; index++) {
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                let counter = index + 1;
                images[src][index].src = sources[src] + "_" + counter + ".png";
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };

    const goNext = () => {
        let newId = parseInt(id) + 1;
        router.push(`/imageviewer/${newId}`);
    };

    const goBack = () => {
        let newId = parseInt(id) - 1;
        router.push(`/imageviewer/${newId}`);
    };
    return (
        <div className={s.container}>
            <canvas ref={canvasRef} width="508" height="500" />
            <div className="flex justify-center mt-2">
                <button
                    disabled={id == 1}
                    className="inline-block px-6 py-2.5 bg-blue-600"
                    onClick={() => goBack()}
                >
                    Back
                </button>
                <button
                    disabled={id == 1000}
                    className="inline-block px-6 py-2.5 bg-blue-600 ml-2"
                    onClick={() => goNext()}
                >
                    Next
                </button>
            </div>

            <img
                onClick={() => setModalOpen(!modalOpen)}
                className={s.toggleModal}
                src="/img/imageviewer/Others/OpenSea Invetory_icons_05.png"
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
