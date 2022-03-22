import useSWR from "swr";
import React, { useState, useEffect, useLayoutEffect } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json());

console.log(process.env.NEXT_PUBLIC_WEBSITE_HOST);
export default function ImageViewerIndex() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data } = useSWR(`/api/crabs?page=${pageIndex}`, fetcher);

    if (data) console.log(data);
    return (
        <>
            <div class="flex flex-col items-center">
                <span class="text-md text-gray-700 dark:text-gray-400">
                    Showing{" "}
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {pageIndex * 100 + 1}
                    </span>{" "}
                    to{" "}
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {pageIndex * 100 + 100}
                    </span>{" "}
                    of <span class="font-semibold text-gray-900 dark:text-white">1000</span>{" "}
                    Anomuras
                </span>

                <div class="inline-flex mt-2 xs:mt-0">
                    <button
                        disabled={pageIndex === 0}
                        onClick={() => setPageIndex(pageIndex - 1)}
                        class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Prev
                    </button>

                    {pageIndex < 10 && (
                        <button
                            disabled={pageIndex === 9}
                            onClick={() => setPageIndex(pageIndex + 1)}
                            class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                                href={`http://localhost:3000/imageviewer/${anomura.crabId}`}
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
                        </div>
                    );
                })}
            </div>
        </>
    );
}
