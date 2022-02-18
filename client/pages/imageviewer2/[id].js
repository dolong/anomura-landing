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
    };

     if (router.isFallback) {
         return <div>Loading...</div>;
     } else {
        return <SVGComponent data={data} />;
     }
}

const SVGComponent = ({ data }) => {
    const { background, body, claws, legs, shell } = data;

    const getImages = (category, srcPart) => {
        let values = "";
        console.log(srcPart);
        //** need to have / before source to get it work inside dynamic route */
        for (let i = 1; i <= 24; i++) {
            values += `/./img/imageviewer/${category}/${srcPart}_${i}.svg;`;
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
                {/* {getImages("Background", "extras_vietnam")} */}

                {getImages("Background", getBackground(background))}
                {getImages("Shell", getShell(shell))}
                {getImages("Legs", getLegs(legs))}
                {getImages("Body", getBody(body))}
                {getImages("Claws", getClaws(claws))}
            </svg>
        </>
    );
};