import * as React from "react";
import { Button } from "@react-pdf-viewer/core";

import SearchSidebarDefaultLayout from "./SearchSidebarDefaultLayout";

const Demo = (props) => {
    const { file } = props;
    const [fileKeywords, setFileKeywords] = React.useState({
        fileUrl: file,
        keywords: [],
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100%",
                margin: "0 auto",
            }}
        >
            {/* <div style={{ display: "flex", marginBottom: "1rem" }}>
                <div style={{ marginRight: ".5rem" }}>
                    <Button
                        onClick={() =>
                            setFileKeywords({
                                fileUrl: file,
                                keywords: ["pdf document", "pdf file"],
                            })
                        }
                    >
                        "pdf documents;pdf file" (doc1)
                    </Button>
                </div>
                <div style={{ marginRight: ".5rem" }}>
                    <Button
                        onClick={() =>
                            setFileKeywords({
                                fileUrl: file,
                                keywords: ["Adobe", "Acrobat", "PDF"],
                            })
                        }
                    >
                        "Adobe;Acrobat;PDF" (doc1)
                    </Button>
                </div>
                <div style={{ marginRight: ".5rem" }}>
                    <Button
                        onClick={() =>
                            setFileKeywords({
                                fileUrl: "/sample.pdf",
                                keywords: ["text", "PDF"],
                            })
                        }
                    >
                        "text;PDF" (doc2)
                    </Button>
                </div>
                <div style={{ marginRight: ".5rem" }}>
                    <Button
                        onClick={() =>
                            setFileKeywords({
                                fileUrl: "/pdf_1.pdf",
                                keywords: ["board member", "public hearing"],
                            })
                        }
                    >
                        "board member;public hearing" (doc3)
                    </Button>
                </div>
                <div style={{ marginRight: ".5rem" }}>
                    <Button
                        onClick={() =>
                            setFileKeywords({
                                fileUrl: "/pdf_2.pdf",
                                keywords: ["advisory board", "public work"],
                            })
                        }
                    >
                        "advisory board;public work" (doc4)
                    </Button>
                </div>
            </div> */}
            <div style={{ flex: 1, overflow: "hidden" }}>
                <SearchSidebarDefaultLayout
                    fileUrl={fileKeywords.fileUrl}
                    keywords={fileKeywords.keywords}
                />
            </div>
        </div>
    );
};

export default Demo;
