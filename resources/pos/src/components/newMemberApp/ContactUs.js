import React, { useEffect, useRef, useState } from "react";

import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
    addContact,
    fetchContacts,
} from "../../member/store/actions/frontendContactAction";
import contactStatus from "./contactStatus.json";
import { getCurrentMember } from "../../shared/sharedMethod";

function ContactUs(props) {
    const { addContact } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const member = getCurrentMember();
    const [statusId, setStatusId] = useState("");
    const dropdownRef = useRef(null);
    /* useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []); */

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);
    const [disable, setDisable] = useState(true);

    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        notes: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        subject: "",
        notes: "",
    });

    const prepareFormData = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("subject", data.subject);
        formData.append("notes", data.notes);
        if (data?.status) {
            formData.append("contact_type", data.status);
        }
        return formData;
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!data["name"]) {
            errorss["name"] = "Please enter name.";
        } else if (!data["email"]) {
            errorss["email"] = "Please enter email.";
        } else if (!data["subject"]) {
            errorss["subject"] = "Please enter subject.";
        } else if (dropdownRef.current && !statusId) {
            errorss["status"] = "Please Select Contact Type.";
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        // check if value includes a decimal point
        if (data.name) {
            setDisable(false);
        }
        setData((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
        setErrors("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = handleValidation();
        if (valid) {
            // console.log({ valid, data });
            addContact(
                prepareFormData({ ...data, status: statusId }),
                navigate
            );
        }
    };

    const [libraryName, setLibraryName] = useState(0);

    // useEffect(() => {
    //     fetchContacts();
    //     console.log({ frontendContact });
    // }, [location.pathname]);

    // console.log({ l: location.pathname });

    const statusOnChange = (e) => {
        setStatusId(e.target.value);
        handleValidation();
    };

    useEffect(() => {
        if (
            window.location.origin.toString() ==
            "https://dindayalupadhyay.smartcitylibrary.com"
        ) {
            setLibraryName(111);
        } else if (
            window.location.origin.toString() ==
            "https://kundanlalgupta.smartcitylibrary.com"
        ) {
            setLibraryName(222);
        } else if (
            window.location.origin.toString() ==
            "https://rashtramatakasturba.smartcitylibrary.com"
        ) {
            setLibraryName(333);
        } else {
            setLibraryName(111);
        }
    }, []);
    return (
        // <div>Hello</div>
        <div className="content-wrapper">
            <ProgressBar />
            <Header />
            <section id="contact" className="p-80px-tb ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
                            <div className="section-title-center text-center">
                                <span>CONTACT US</span>
                                <h2 className="display-6">
                                    We'd love to hear from you
                                </h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-lg-8 col-md-6 col-sm-12 m-25px-b aos-init"
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            <div className="contact-form-box">
                                {member ? (
                                    <div
                                        ref={dropdownRef}
                                        className="publisher form-group"
                                    >
                                        {/* <label htmlFor="book-publisher">Publisher</label> */}
                                        <select
                                            defaultValue={statusId}
                                            className="form-select"
                                            aria-label="Select Author."
                                            onChange={statusOnChange}
                                        >
                                            <option value="">
                                                Search By Type
                                            </option>
                                            {contactStatus.length ? (
                                                contactStatus.map(
                                                    (status, i) => {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={
                                                                    status.id
                                                                }
                                                                defaultChecked={
                                                                    status.id ===
                                                                    1
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                {status.name.toUpperCase()}
                                                            </option>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <option value="">
                                                    No records found.
                                                </option>
                                            )}
                                        </select>
                                        <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["status"]
                                                ? errors["status"]
                                                : null}
                                        </span>
                                    </div>
                                ) : null}
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group mb13">
                                        <input
                                            name="name"
                                            className="contact-name"
                                            id="contact-name"
                                            type="text"
                                            placeholder="Your Name"
                                            required={true}
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                        <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["name"]
                                                ? errors["name"]
                                                : null}
                                        </span>
                                    </div>
                                    <div className="form-group mb13">
                                        <input
                                            name="email"
                                            className="contact-email"
                                            id="contact-email"
                                            type="email"
                                            placeholder="Your Email"
                                            onChange={(e) => onChangeInput(e)}
                                            required={true}
                                        />
                                        <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["email"]
                                                ? errors["email"]
                                                : null}
                                        </span>
                                    </div>
                                    <div className="form-group mb13">
                                        <input
                                            name="subject"
                                            className="contact-subject"
                                            id="contact-subject"
                                            type="text"
                                            placeholder="Subject"
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                        <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["subject"]
                                                ? errors["subject"]
                                                : null}
                                        </span>
                                    </div>
                                    <div className="form-group mb30">
                                        <textarea
                                            name="notes"
                                            className="contact-message"
                                            id="contact-message"
                                            placeholder="Your Message"
                                            onChange={(e) => onChangeInput(e)}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex ">
                                        <button
                                            type="submit"
                                            className="btn frontend-btn align-items-center"
                                            disabled={disable}
                                        >
                                            <span>Send Now</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-md-6 col-sm-12 m-25px-b aos-init"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            <div className="contact__address p-30px">
                                <ul className="contact__address__content">
                                    {libraryName == 111 ? (
                                        <li>
                                            <span>ADDRESS:</span>
                                            Great Nag Rd, Indira Nagar
                                            <br />
                                            Rambagh, Nagpur, Maharashtra 440003
                                        </li>
                                    ) : (
                                        ""
                                    )}

                                    {libraryName == 222 ? (
                                        <li>
                                            <span>ADDRESS:</span>
                                            43MR+R46, Great Nag Rd, Indira
                                            Nagar,
                                            <br />
                                            Rambagh, Nagpur, Maharashtra 440003
                                        </li>
                                    ) : (
                                        ""
                                    )}

                                    {libraryName == 333 ? (
                                        <li>
                                            <span>ADDRESS:</span>
                                            Near Tuta Bagicha & Gandhi Statue,
                                            Sadar,
                                            <br />
                                            Nagpur, Maharashtra 440001
                                        </li>
                                    ) : (
                                        ""
                                    )}

                                    <li>
                                        <span>PHONE:</span>
                                        <a href="tel:+9194228092">
                                            +91 94228092
                                        </a>{" "}
                                        ,
                                        <a href="tel:+919834467686">
                                            +91 9834467686
                                        </a>
                                    </li>
                                    <li>
                                        <span>EMAIL:</span>
                                        <a href="/">
                                            info@educron.com,{" "}
                                            info@createonlineacademy.com{" "}
                                        </a>
                                    </li>
                                </ul>
                                {/*  <h4>Reach out to us on social media</h4>
                                <ul className="social-icon mt-3">
                                    <li>
                                        <a href="https://www.facebook.com">
                                            <img
                                                className="img-fluid"
                                                src="images/facebook.svg"
                                                alt="icon"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com">
                                            <img
                                                className="img-fluid"
                                                src="images/twitter.svg"
                                                alt="icon"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com">
                                            <img
                                                className="img-fluid"
                                                src="images/linkedin.svg"
                                                alt="icon"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com">
                                            <img
                                                className="img-fluid"
                                                src="images/youtube-play.svg"
                                                alt="icon"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.whatsapp.com">
                                            <img
                                                className="img-fluid"
                                                src="images/whatsapp.svg"
                                                alt="icon"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default connect(null, { addContact })(React.memo(ContactUs));
