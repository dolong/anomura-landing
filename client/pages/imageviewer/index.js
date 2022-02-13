import React, { useState, useEffect } from "react";
import { MultipleSelect } from "./MultipleSelect";
import { backgroundData } from "./data";

//const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ImageViewer() {
    // const [crabSelector, setCrabSelector] = useState(null)
    // const [crabQuery, setCrabQuery] = useState({
    //     background: null,
    //     body: null,
    //     legs: null,
    //     claws: null,
    //     shell: null,
    //     headPieces: null,
    // });

    // const { data, error } = useSwr(
    //     getCrab2,
    //     fetcher
    // );

    // if (error) return <div>Failed to load crabs</div>;
    // if (!data) return <div>Loading...</div>;

    // };
    const backgroundImage = (category, srcPart) => {
        let values ="";
         for (let i = 1; i <= 24; i++) {
            values += `./img/imageviewer/${category}/${srcPart}_${i}.svg;`;
         }
        return (
            // ./img/imageviewer/Background/${srcPart}_1.svg
            <image width="96" height="96">
            <animate
                attributeName="xlink:href"
                values={values}
                begin="0s"
                repeatCount="indefinite"
                dur="2.5s"
            ></animate>
        </image>
        )
    }
    return (
        <svg
            width="300"
            height="300"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
           {backgroundImage("Background", "extras_vietnam")}
        </svg>
    );
}


