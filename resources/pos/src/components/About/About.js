import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, dateFormatter } from "../../shared/sharedMethod";
import { fetchPenalties } from "../../admin/store/actions/penaltyAction";
import { toggleModal } from "../../store/action/modalAction";
import { icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const About = (props) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const videos = [
        {
            name: "How to search for E-Books and other Books",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to search for E-Books and other Books.mp4",
            image_name: "How to search for E-Books and other Books",
        },
        {
            name: "How to Catalouge a New Book",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to Catalouge a New Book.mp4",
            image_name: "How_Librarian_can_catalogue_a_new_book",
        },
        {
            name: "How members can reset the password",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How members can reset the password.mp4",
            image_name: "How members can reset the password",
        },
        {
            name: "How members can subscribe and read digital books",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How members can subscribe and read digital books.mp4",
            image_name: "How members can subscribe and read digital books",
        },

        {
            name: "How to issue and return Physical Books",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to issue and return Physical Books.mp4",
            image_name: "How to issue and return the Physical Books",
        },

        {
            name: "MY ACCOUNT section of a Member",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/MY ACCOUNT section of a Member.mp4",
            image_name: "MY ACCOUNT section of a Member",
        },

        {
            name: "How members can register and Login",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How members can register and Login.mp4",
            image_name: "How members can register and Login",
        },

        {
            name: "How to add members in the Library",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to add members in the Library.mp4",
            image_name: "How Librarian can add members in the E-Library",
        },
        {
            name: "How to Catalogue a Digital Book",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to Catalogue a Digital Book.mp4",
            image_name: "How Librarian can catalogue a Digital Book",
        },
    ];

    const openVideo = (url) => {
        setVideoUrl(url);
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        setIsVideoOpen(false);
        setVideoUrl("");
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredVideos = videos.filter((video) =>
        video.name.toLowerCase().includes(searchQuery)
    );

    return (
        <MasterLayout>
            <TopProgressBar />
            {/* <TabTitle title={placeholderText("penalties.title")} /> */}
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    <h5 className="page-heading">How It Works</h5>
                </Col>
                <Col sm={12}>
                    <section className="video-list">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="module">
                            {filteredVideos.map((video, index) => (
                                <article key={index} className="video_col">
                                    <div className="video_block">
                                        <img
                                            src={`https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos-thumbnail/${video.image_name}.png`}
                                            alt="Video thumbnail"
                                            onClick={() => openVideo(video.url)}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://dindayalupadhyay.smartcitylibrary.com/images/ctav4.jpg";
                                            }}
                                        />
                                        <span
                                            className="video-block-btn"
                                            onClick={() => openVideo(video.url)}
                                        >
                                            <svg
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                            </svg>
                                        </span>
                                    </div>

                                    <h4>{video.name}</h4>
                                </article>
                            ))}
                        </div>

                        {isVideoOpen && (
                            <div className="video_popup">
                                <div className="video_popup_container">
                                    <span
                                        className="video_close_btn"
                                        onClick={closeVideo}
                                    >
                                        ×
                                    </span>
                                    <iframe
                                        title="Video"
                                        width="900"
                                        height="600"
                                        src={videoUrl}
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </section>
                </Col>
            </Row>
        </MasterLayout>
    );
};
export default About;
