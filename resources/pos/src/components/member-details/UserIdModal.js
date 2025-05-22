import React, { useRef } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/action/loadingAction";
const UserIdModal = (props) => {
    const dispatch = useDispatch();
    const { isUserIdModal, toggle, member } = props;
    const pdfRef = useRef();

    const printIdCard = () => {
        dispatch(setLoading(true));
        html2canvas(pdfRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 50, 50);
            pdf.output("dataurlnewwindow");

            // const imgData = canvas.toDataURL("image/png");
            // const pdf = new jsPDF("p", "mm", "a4", true);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = pdf.internal.pageSize.getHeight();
            // const imgWidth = canvas.width;
            // const imgHeight = canvas.height;
            // const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            // const imgX = (pdfWidth - imgWidth * ratio) / 2;
            // const imgY = 50;
            // pdf.addImage(imgData, "PNG", imgX, imgY);
            pdf.save("download.pdf");
            dispatch(setLoading(false));
        });
    };
    return (
        <div>
            <Modal isOpen={isUserIdModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    ID Card
                    {/* <input
                        type="text"
                        className="form-control"
                        onChange={(e) => gotoPage(e)}
                        placeholder="goto..."
                    /> */}
                </ModalHeader>
                <ModalBody className="d-flex pdf-modal flex-column align-items-center justify-content-center gap-2">
                    <div
                        ref={pdfRef}
                        style={{
                            width: 400,
                            height: "auto",
                            border: "3px solid #C27B7F",
                            borderRadius: 25,
                            overflow: "hidden",
                            color: "#000",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                padding: "15px 0",
                                backgroundColor: "#F5EBE6",
                            }}
                        >
                            <div>
                                <img
                                    width={200}
                                    src="/images/logo-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontFamily: "Philosopher",
                                        padding: "10px 0",
                                    }}
                                >
                                    {member.user_library_id == 111
                                        ? "Dindayalupadhyay Smartcity E-library"
                                        : member.user_library_id === 222
                                        ? "Kundanlalgupta Smartcity E-library"
                                        : "Rashtramatakasturba Smartcity E-library"}
                                </h2>
                            </div>
                        </div>
                        <article
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <div>
                                <img
                                    width={150}
                                    style={{
                                        padding: "15px 0",
                                    }}
                                    src={
                                        member.image_path
                                            ? member.image_path
                                            : "/images/user-avatar.png"
                                    }
                                    alt="user-image"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src =
                                            "/images/user-avatar.png";
                                    }}
                                />
                            </div>
                            <ul
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <li>
                                    Name : {member.first_name}{" "}
                                    {member.last_name}
                                </li>
                                <li>Email : {member.email}</li>
                                <li>Phone No : {member.phone}</li>
                            </ul>
                        </article>
                        <article
                            style={{
                                textAlign: "center",
                                backgroundColor: "#F5EBE6",
                                padding: "15px",
                            }}
                        >
                            <Barcode value={member.id} background="#F5EBE6" />
                        </article>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={printIdCard}>
                        Download
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UserIdModal;
