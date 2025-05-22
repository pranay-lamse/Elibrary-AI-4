import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Demo from "../newMemberApp/NewPdfReader/Demo";

const PDFpreivew = (props) => {
    const { pageNumber, onDocumentLoadSuccess, filePath, libraryId } = props;
    return (
        // <Document
        //     file={{
        //         url: filePath
        //             ? "public/uploads/PDFPreview/" + filePath
        //             : "/assets/Profile.pdf",
        //     }}
        //     onLoadSuccess={onDocumentLoadSuccess}
        //     loading={""}
        // >
        //     <Page width={700} pageNumber={pageNumber} />
        // </Document>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.js">
            <Demo
                file={
                    window.location.origin +
                    "/public/uploads/Resources/" +
                    filePath
                }
            />
        </Worker>
    );
};

const ResourcePDFModal = (props) => {
    const { modal, toggle, filePath, libraryId } = props;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // console.log({ filePath });

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    const increment = () => {
        setPageNumber((prev) => {
            if (prev >= numPages) {
                return (prev = numPages);
            } else {
                return (prev += 1);
            }
        });
    };

    const decrement = () => {
        setPageNumber((prev) => {
            if (prev === 1) {
                return (prev = 1);
            }
            return (prev -= 1);
        });
    };

    const gotoPage = (e) => {
        setPageNumber(
            parseInt(e.target.value) > numPages
                ? numPages
                : parseInt(e.target.value)
        );
    };

    return (
        <div>
            {/* <Button color="danger" onClick={toggle}>
                Click Me
            </Button> */}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Preview
                    {/* <input
                        type="text"
                        className="form-control"
                        onChange={(e) => gotoPage(e)}
                        placeholder="goto..."
                    /> */}
                </ModalHeader>
                <ModalBody className="d-flex pdf-modal flex-column align-items-center justify-content-center gap-2">
                    {filePath ? (
                        <PDFpreivew
                            {...{
                                pageNumber,
                                onDocumentLoadSuccess,
                                filePath,
                                libraryId,
                            }}
                        />
                    ) : (
                        <p style={{ padding: "10px auto" }}>
                            No Preview Available
                        </p>
                    )}
                    {/* {filePath && isLoading ? (
                        <div className="pdf-spinner">
                            <img src="/public/images/301.gif" />
                        </div>
                    ) : null} */}
                </ModalBody>
                {/* {filePath && !isLoading ? (
                    <ModalFooter>
                        <Button color="primary" onClick={decrement}>
                            Prev
                        </Button>{" "}
                        <p className="flex items-center px-2">
                            {pageNumber} of {numPages}
                        </p>
                        <Button color="danger" onClick={increment}>
                            Next
                        </Button>
                    </ModalFooter>
                ) : null} */}
            </Modal>
        </div>
    );
};

export default ResourcePDFModal;
