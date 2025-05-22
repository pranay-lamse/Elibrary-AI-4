import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from "react-player";
function ResourceVideoModal(props) {
    const { classes, setVideoModal, videoModal, url } = props;
    return (
        <>
            <Modal
                isOpen={videoModal}
                toggle={() => setVideoModal((prev) => !prev)}
            >
                <ModalHeader toggle={() => setVideoModal((prev) => !prev)}>
                    Preview
                    {/* <input
                        type="text"
                        className="form-control"
                        onChange={(e) => gotoPage(e)}
                        placeholder="goto..."
                    /> */}
                </ModalHeader>
                <ModalBody className="d-flex pdf-modal flex-column align-items-center justify-content-center gap-2">
                    {url.includes("mp4") ? (
                        <ReactPlayer
                            url={
                                window.location.origin +
                                "/public/uploads/Resources/" +
                                url
                            }
                            width="100%"
                            height="360"
                            controls
                        />
                    ) : (
                        <div>
                            <audio controls>
                                <source
                                    src={
                                        window.location.origin +
                                        "/public/uploads/Resources/" +
                                        url
                                    }
                                    type="audio/mp3"
                                />
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    )}
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
        </>
    );
}

export default ResourceVideoModal;
