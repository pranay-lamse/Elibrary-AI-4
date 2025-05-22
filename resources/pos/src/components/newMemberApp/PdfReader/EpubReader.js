import React, { useRef, useState } from "react";
import { ReactReader } from "react-reader";

function ReactEpub({ url }) {
    const [location, setLocation] = useState(null);
    const [page, setPage] = useState("");
    const [firstRenderDone, setFirstRenderDone] = useState(false);
    const renditionRef = useRef(null);
    const tocRef = useRef(null);
    const locationChanged = (epubcifi) => {
        if (renditionRef.current && tocRef.current) {
            const { displayed, href } = renditionRef.current.location.start;
            const chapter = tocRef.current.find((item) => item.href === href);
            setPage(
                `Page ${displayed.page} of ${displayed.total} in chapter ${
                    chapter ? chapter.label : "n/a"
                }`
            );
        }

        if (!firstRenderDone) {
            setLocation(localStorage.getItem("book-progress")); // getItem returns null if the item is not found.
            setFirstRenderDone(true);
            return;
        }
        localStorage.setItem("book-progress", epubcifi);
        setLocation(epubcifi);
    };
    return (
        <>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    url={url}
                    getRendition={(rendition) =>
                        (renditionRef.current = rendition)
                    }
                    tocChanged={(toc) => (tocRef.current = toc)}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    left: "1rem",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {page}
            </div>
        </>
    );
}

export default ReactEpub;
