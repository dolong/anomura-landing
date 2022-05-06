import React, { useEffect, useState } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";
import { BufferLoader } from "utils/buffer-loader";

export default function AnimateViewerRandomize() {
    useEffect(() => {}, []);
    return (
        <div className="flex flex-row flex-wrap">
            <CrabContainer />;
        </div>
    );
}

const CrabContainer = () => {
    useEffect(() => {}, []);

    let sources = {
        sequences: "/./img/imageviewer/Test/",
    };

    return (
        <div className="flex flex-column">
            <CrabCanvas sources={sources} />
        </div>
    );
};

const INITIAL = 0;
const STEP_1 = 1;
const STEP_2 = 2;
const STEP_3 = 3;

const CrabCanvas = ({ sources }) => {
    const [imagesSrc, setImageSrc] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [currentState, setCurrentState] = React.useState(INITIAL);
    const [showButton, setShownButton] = React.useState(true);
    const [intervalID, setInterID] = useState();
    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;

    let bufferLoader, audioContext;
    const [audioState, setAudioState] = useState("unloaded");

    const [audioControl, setAudioControl] = useState({
        isSoundOn: false,
        audioContext: null,
        bufferList: null,
        audioMaps: {},
        sound1: {
            isPlaying: false,
        },
        sound2: {},
    });

    const LoadAudios = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        bufferLoader = new BufferLoader(
            audioContext,
            ["/img/imageviewer/Test/test01.mp3"],
            onFinishedLoadingAudioSource
        );

        bufferLoader.load();
    };

    const onFinishedLoadingAudioSource = (bufferList) => {
        setAudioControl((prevState) => ({
            ...prevState,
            setSound: function (val) {
                if (val === false) {
                    this.sound1.setVolume(0);
                } else {
                    // this.bgMusic.playSound();
                    this.sound1.playSound(0.5);
                }
            },

            bufferList,
            sound1: {
                source: null,
                gainNode: null,
                playSound: function (volumeVal = 0) {
                    console.log("playing audio");
                    this.source = audioContext.createBufferSource();
                    this.source.buffer = bufferList[0];
                    this.gainNode = audioContext.createGain();
                    this.gainNode.gain.value = volumeVal;
                    this.source.connect(this.gainNode).connect(audioContext.destination);
                    this.source.start(0);
                },
            },
        }));

        setAudioState("loaded");
        console.log("Audio loaded");
    };

    useEffect(() => {
        if (audioState == "unloaded") {
            LoadAudios();
        }
        canvas = canvasRef?.current;
        context = canvas?.getContext("2d");
        if (canvasRef && context && isLoaded == false) {
            LoadImages(sources).done((images) => {
                console.log("Load image done");
                setImageSrc({ ...images });
                setIsLoaded(true);
            });
        }

        if (currentState === STEP_1) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            audioControl.sound1.playSound(1);
            DrawSequence1(imagesSrc, canvas, context);
        }
        if (currentState === STEP_2) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            let canvasInterval = DrawSequence2(imagesSrc, canvas, context);
            setInterID(canvasInterval);
        }
        if (currentState === STEP_3) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            DrawSequence3(imagesSrc, canvas, context);
        }
    }, [imagesSrc, currentState]);

    const handleOnChange = () => {
        setShownButton(true);
    };

    const handleContinue = () => {
        setShownButton(false);
        if (currentState === INITIAL) {
            // console.log("Load image true");
            // canvas = canvasRef?.current;
            // context = canvas?.getContext("2d");

            // setIsLoaded(false);
            // audioControl.sound1.playSound(1);
            // DrawSequence1(imagesSrc, canvas, context);
            setCurrentState(STEP_1);
        }
        if (currentState === STEP_2) {
            clearInterval(intervalID);
            setCurrentState(STEP_3);
        }
    };

    const DrawSequence1 = (images, canvas, context) => {
        let width = 1000;
        let height = 508;
        let counter = 100;
        let interval = setInterval(() => {
            if (counter == 115) {
                clearInterval(interval);
                setCurrentState(STEP_2);
            }
            context.drawImage(images.sequences[counter], 0, 0, width, height);
            counter++;
        }, 85);
    };

    const DrawSequence2 = (images, canvas, context) => {
        let width = 1000;
        let height = 508;
        let counter = 116;
        console.log(images.sequences);
        return setInterval(() => {
            if (counter == 130) {
                counter = 116;
            }
            context.drawImage(images.sequences[counter], 0, 0, width, height);
            counter++;
        }, 85);
    };

    const DrawSequence3 = (images, canvas, context) => {
        let width = 1000;
        let height = 508;
        let counter = 130;
        console.log("test 3");
        let interval = setInterval(() => {
            if (counter == 135) {
                clearInterval(interval);
                setCurrentState(STEP_1);
            }
            console.log("test 3");
            context.drawImage(images.sequences[counter], 0, 0, width, height);
            counter++;
        }, 85);
    };

    const LoadImages = (sources, onFinished) => {
        let imageLoaded = 0,
            i = 0,
            numImages = 0;

        const images = {
            sequences: [],
        };
        var postaction = function () {};

        // 24 frames per part, we have 7 parts ~ 24 * 7 = 168
        function onFinished() {
            if (imageLoaded == 35) {
                postaction(images);
            }
        }
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            for (let index = 100; index <= 135; index++) {
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                let counter = index + 1;
                images[src][index].src = sources[src] + "test0" + counter + ".png";
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
            <div className={s.container}>
                <canvas ref={canvasRef} width="1000" height="500" />

                <style>
                    {`
                        body {
                            font-family: Atlantis;
                            font-size:36px;
                            color:white;
                        }`}
                </style>
                {isLoaded === true && currentState === INITIAL && (
                    <div className="flex space-x-2 justify-center mt-4">
                        <button
                            className="inline-block px-6 py-2.5 bg-blue-600"
                            onClick={() => handleContinue()}
                        >
                            START
                        </button>
                    </div>
                )}

                {showButton === true && currentState !== INITIAL && (
                    <div className="flex space-x-2 justify-center mt-4">
                        <button
                            className="inline-block px-6 py-2.5 bg-blue-600"
                            onClick={() => handleContinue()}
                        >
                            CONTINUE
                        </button>
                    </div>
                )}

                {currentState === STEP_2 && (
                    <div className="flex space-x-2 justify-center mt-4 absolute top-0 left-20">
                        <fieldset>
                            <legend>CTA TEST:</legend>

                            <div>
                                <input
                                    type="checkbox"
                                    id="scales"
                                    name="scales"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <label htmlFor="scales">Selection ONE</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="horns"
                                    name="horns"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <label htmlFor="horns">Selection TWO</label>
                            </div>
                        </fieldset>
                    </div>
                )}
            </div>
        </>
    );
};
