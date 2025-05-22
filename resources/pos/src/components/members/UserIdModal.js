import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/action/loadingAction";

const UserIdModal = (props) => {
    const dispatch = useDispatch();
    const { isUserIdModal, toggle, members } = props;
    const pdfRef = useRef();

    const printIdCard = () => {
        dispatch(setLoading(true));
        html2canvas(pdfRef.current).then((canvas) => {
            // const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "letter", true);
            // pdf.addImage(imgData, "JPEG", 0, 0);
            // pdf.output("dataurlnewwindow");
            // pdf.save("download.pdf");

            const imgWidth = 208;
            const pageHeight = 295;
            // const imgWidth = 408;
            // const pageHeight = 495;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            heightLeft -= pageHeight;
            pdf.addImage(
                canvas,
                "PNG",
                0,
                position,
                imgWidth,
                imgHeight,
                "",
                "FAST"
            );
            while (heightLeft >= 0) {
                console.log({ position, heightLeft, imgHeight });
                position = heightLeft - imgHeight;
                pdf.addPage("letter");
                pdf.addImage(
                    canvas,
                    "PNG",
                    0,
                    position,
                    imgWidth,
                    imgHeight,
                    "",
                    "FAST"
                );
                heightLeft -= pageHeight;
            }
            pdf.save("Downld.pdf");
            dispatch(setLoading(false));
        });

        // let jsPdf = new jsPDF("p", "pt", "letter");

        // you need to load html2canvas (and dompurify if you pass a string to html)
        // const opt = {
        //     callback: function (jsPdf) {
        //         jsPdf.save("Test.pdf");
        //         // to open the generated PDF in browser window
        //         // window.open(jsPdf.output('bloburl'));
        //     },
        //     // margin: [72, 72, 72, 72],
        //     autoPaging: "text",
        //     html2canvas: {
        //         allowTaint: true,
        //         dpi: 300,
        //         letterRendering: true,
        //         logging: false,
        //         scale: 0.7,
        //     },
        // };

        // jsPdf.html(pdfRef.current, opt);

        dispatch(setLoading(true));
    };

    // function printDiv(divId) {
    //     var printContents = divId.innerHTML;
    //     var originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents;
    // }

    return (
        <div>
            <Modal
                isOpen={isUserIdModal}
                toggle={toggle}
                style={{ minWidth: "900px" }}
            >
                <ModalHeader toggle={toggle}>ID Card</ModalHeader>
                <ModalBody className="d-flex flex-wrap pdf-modal align-items-center">
                    <div
                        ref={pdfRef}
                        className="d-flex flex-wrap align-items-center"
                    >
                        {members.map((member, i) => {
                            return (
                                <>
                                    {/* {(i + 1) % 4 === 0 ? <br /> : null} */}
                                    <div
                                        key={member.id}
                                        className={`userid-card`}
                                        style={{
                                            width: "400px",
                                            padding: "15px",
                                        }}
                                    >
                                        <div
                                            style={{
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
                                                    justifyContent:
                                                        "space-evenly",
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
                                                            fontFamily:
                                                                "Philosopher",
                                                            padding: "10px 0",
                                                        }}
                                                    >
                                                        {member.user_library_id ==
                                                        111
                                                            ? "Dindayalupadhyay Smartcity E-library"
                                                            : member.user_library_id ===
                                                              222
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
                                                        height={150}
                                                        style={{
                                                            padding: "15px 0",
                                                            objectFit:
                                                                "contain",
                                                        }}
                                                        src={
                                                            member.image_path
                                                                ? member.image_path
                                                                : "/images/user-avatar.png"
                                                        }
                                                        alt="user-image"
                                                        onError={({
                                                            currentTarget,
                                                        }) => {
                                                            currentTarget.onerror =
                                                                null; // prevents looping
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
                                                        Name :{" "}
                                                        {member.first_name}{" "}
                                                        {member.last_name}
                                                    </li>
                                                    <li>
                                                        Email : {member.email}
                                                    </li>
                                                    <li>
                                                        Phone No :{" "}
                                                        {member.phone}
                                                    </li>
                                                </ul>
                                            </article>
                                            <article
                                                style={{
                                                    textAlign: "center",
                                                    backgroundColor: "#F5EBE6",
                                                    padding: "15px",
                                                }}
                                            >
                                                <Barcode
                                                    value={member.id}
                                                    background="#F5EBE6"
                                                />
                                                <div
                                                    id={`barcode-${member.id}`}
                                                ></div>
                                            </article>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
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
