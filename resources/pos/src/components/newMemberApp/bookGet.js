import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "../../../src/assets/images/defaultBook.png";
import "./style.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
const BookGet = (props) => {
    const navigate = useNavigate();
    const handleDetails = (previewLink) => {
        navigate("/search/book&" + previewLink);
    };

    const imageVariants = {
        hover: {
            scale: 1.7,
            boxShadow: "0px 0px 8px #000",
            transition: {
                duration: 0.5,
                type: "spring",
                delay: 0.15,
            },
        },
    };
    /* console.log(props); */
    let { name, authors_name, publisher_id, image, library_id, id } = props;

    //setting up default values for volume info data
    let title = name;
    let authors = authors_name || "Author(s) name not available";
    let publisher = publisher_id || "Publisher company not available";
    let id1 = id;
    let libraryid = library_id || "null";
    let previewLink = `${title}/${id1}/${libraryid}`;

    if (library_id == "111") {
        var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
    } else if (library_id == "222") {
        var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
    } else {
        var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${image}`;
    }

    if (library_id == "111") {
        var library_name = "Dindayal Upadhyay Library";
    } else if (library_id == "222") {
        var library_name = "Kundanlal Gupta Library";
    } else {
        var library_name = "Rashtra Matakasturba Library";
    }



    return (
        /* new div  */

        <div
            key={id}
            className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
            data-aos="zoom-in"
        >
            <div className="card color-cards">
                <div className="card-body p-0">
                    <div
                        className="text-center card-contents"
                        style={{
                            backgroundColor: "#f2f2f2",
                        }}
                        onClick={() => handleDetails(previewLink)}
                    >
                        <div className="card-image">
                            <img
                                src={image ? site_name_image_path : defaultBook}
                                width="400px"
                                alt="Book-cover"
                                variants={imageVariants}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = defaultBook;
                                }}
                            />
                        </div>
                        <div className="card-details text-center pt-3">
                            <h6 className="m-0 pb-3"> {title && title}</h6>
                        </div>
                        <div className="card-desc-box d-flex flex-column align-items-center justify-content-around">
                            <div
                                className="m-0 pb-1"
                                style={{
                                    width: "fit-content",
                                    padding: "auto 5px",
                                }}
                            >
                                {library_name && library_name}
                                <div className="d-flex flex-column align-items-center library_badge">
                                    <span className="badge badge-info"></span>
                                </div>
                                <div className="available_book"></div>
                            </div>

                            <button
                                className="btn btn-white frontend-btn"
                                onClick={() => handleDetails(previewLink)}
                            >
                                <span>Read More</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        /* new div  */
    );
};

export default BookGet;
