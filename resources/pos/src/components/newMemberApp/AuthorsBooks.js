import React, { useEffect, useRef, useState } from "react";

import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
    addContact,
    fetchContacts,
} from "../../member/store/actions/frontendContactAction";
import contactStatus from "./contactStatus.json";
import { getCurrentMember } from "../../shared/sharedMethod";

function AuthorsBooks(props) {
    const { addContact, books } = props;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const member = getCurrentMember();
    const [statusId, setStatusId] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
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

    // useEffect(() => {
    //     fetchContacts();
    //     console.log({ frontendContact });
    // }, [location.pathname]);

    // console.log({ l: location.pathname });

    const statusOnChange = (e) => {
        setStatusId(e.target.value);
        handleValidation();
    };

    console.log({ books });

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
                                <span>Books Related to</span>
                                <h2 className="display-6">
                                    {id.replace("-", " ")}
                                </h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { books } = state;
    return {
        books,
    };
};

export default connect(mapStateToProps, { addContact })(
    React.memo(AuthorsBooks)
);
