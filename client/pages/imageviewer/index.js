import useSWR from "swr";
import React, { useState, useEffect, useLayoutEffect } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ImageViewerIndex() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data, error } = useSWR(`/api/crabs?page=${pageIndex}`, fetcher);

    useEffect(() => { });

    // if (data) console.log(data);
    if (error) console.log(error);
    return (
        <>
            <div className="flex flex-col items-center">
                <span className="text-md text-gray-700 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageIndex * 100 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageIndex * 100 + 100}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900 dark:text-white">1000</span>{" "}
                    Anomuras
                </span>

                <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        disabled={pageIndex === 0}
                        onClick={() => setPageIndex(pageIndex - 1)}
                        className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Prev
                    </button>

                    {pageIndex < 10 && (
                        <button
                            disabled={pageIndex === 9}
                            onClick={() => setPageIndex(pageIndex + 1)}
                            className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 grid gap-10 xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
                {data?.map((anomura, index) => {
                    return (
                        <div key={index}>
                            <a
                                href={`${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/${anomura.crabId}`}
                                target="_blank"
                                className="text-red-200"
                            >
                                <img src={anomura.image} alt="" />
                            </a>
                            <div className="text-lg font-bold">Anomura: {anomura.crabId}</div>
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
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
