import * as React from "react";
import { MinimalButton, Spinner, TextBox } from "@react-pdf-viewer/core";
import { NextIcon, PreviousIcon } from "@react-pdf-viewer/search";

var SearchStatus;
(function (SearchStatus) {
    SearchStatus[(SearchStatus["NotSearchedYet"] = 0)] = "NotSearchedYet";
    SearchStatus[(SearchStatus["Searching"] = 1)] = "Searching";
    SearchStatus[(SearchStatus["FoundResults"] = 2)] = "FoundResults";
})(SearchStatus || (SearchStatus = {}));

const SearchSidebar = ({
    isDocumentLoaded,
    keywords,
    searchPluginInstance,
}) => {
    const [searchStatus, setSearchStatus] = React.useState(
        SearchStatus.NotSearchedYet
    );
    const [currentMatch, setCurrentMatch] = React.useState();
    const [matches, setMatches] = React.useState([]);

    const [keyword, setKeyword] = React.useState(
        keywords.length ? keywords.join(";") : ""
    );
    const { highlight, jumpToMatch, jumpToNextMatch, jumpToPreviousMatch } =
        searchPluginInstance;

    const renderMatchSample = (match) => {
        //  match.startIndex    match.endIndex
        //      |                       |
        //      ▼                       ▼
        //  ....[_____props.keyword_____]....

        const wordsBefore = match.pageText.substr(match.startIndex - 20, 20);
        let words = wordsBefore.split(" ");
        words.shift();
        const begin = words.length === 0 ? wordsBefore : words.join(" ");

        const wordsAfter = match.pageText.substr(match.endIndex, 60);
        words = wordsAfter.split(" ");
        words.pop();
        const end = words.length === 0 ? wordsAfter : words.join(" ");

        return (
            <div>
                {begin}
                <span style={{ backgroundColor: "rgb(255, 255, 0)" }}>
                    {match.pageText.substring(match.startIndex, match.endIndex)}
                </span>
                {end}
            </div>
        );
    };

    const performSearch = (keywords) => {
        setSearchStatus(SearchStatus.Searching);
        highlight(keywords).then((matches) => {
            setSearchStatus(SearchStatus.FoundResults);
            setMatches(matches);
        });
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter" && keyword) {
            performSearch(keyword.split(";"));
        }
    };

    React.useLayoutEffect(() => {
        if (isDocumentLoaded && keywords.length) {
            setKeyword(keywords.join(";"));
            performSearch(keywords);
        }
    }, [keywords]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
                width: "100%",
            }}
        >
            <div style={{ padding: ".5rem" }}>
                <div style={{ position: "relative" }}>
                    <TextBox
                        placeholder="Enter to search"
                        value={keyword}
                        onChange={setKeyword}
                        onKeyDown={handleSearchKeyDown}
                    />
                    {searchStatus === SearchStatus.Searching && (
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                bottom: 0,
                                position: "absolute",
                                right: ".5rem",
                                top: 0,
                            }}
                        >
                            <Spinner size="1.5rem" />
                        </div>
                    )}
                </div>
            </div>
            {searchStatus === SearchStatus.FoundResults && (
                <>
                    {matches.length === 0 && "Not found"}
                    {matches.length > 0 && (
                        <>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    padding: ".5rem",
                                }}
                            >
                                <div
                                    style={{
                                        color: "rgba(0, 0, 0, .5)",
                                        fontSize: ".8rem",
                                        marginRight: ".5rem",
                                    }}
                                >
                                    Found {matches.length} results
                                </div>
                                <div
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: ".5rem",
                                    }}
                                >
                                    <MinimalButton
                                        onClick={() =>
                                            setCurrentMatch(
                                                jumpToPreviousMatch()
                                            )
                                        }
                                    >
                                        <PreviousIcon />
                                    </MinimalButton>
                                </div>
                                <MinimalButton
                                    onClick={() =>
                                        setCurrentMatch(jumpToNextMatch())
                                    }
                                >
                                    <NextIcon />
                                </MinimalButton>
                            </div>
                            <div
                                style={{
                                    borderTop: "1px solid rgba(0, 0, 0, .2)",
                                    flex: 1,
                                    overflow: "auto",
                                    padding: ".5rem 1rem",
                                }}
                            >
                                {matches.map((match, index) => (
                                    <div
                                        key={index}
                                        style={{ margin: "1rem 0" }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: ".5rem",
                                            }}
                                        >
                                            <div>#{index + 1}</div>
                                            <div
                                                style={{
                                                    color: "rgba(0, 0, 0, .5)",
                                                    fontSize: ".8rem",
                                                    textAlign: "right",
                                                }}
                                            >
                                                Page {match.pageIndex + 1}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                backgroundColor:
                                                    currentMatch === match
                                                        ? "rgba(0, 0, 0, .1)"
                                                        : "",
                                                border: "1px solid rgba(0, 0, 0, .2)",
                                                borderRadius: ".25rem",
                                                cursor: "pointer",
                                                overflowWrap: "break-word",
                                                padding: ".5rem",
                                            }}
                                            onClick={() => {
                                                setCurrentMatch(match);
                                                jumpToMatch(index + 1);
                                            }}
                                        >
                                            {renderMatchSample(match)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchSidebar;
