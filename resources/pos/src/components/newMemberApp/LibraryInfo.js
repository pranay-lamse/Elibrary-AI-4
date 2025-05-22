import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ChangeLanguageForm from "../../member/components/change-language/ChangeLanguageForm";
import ChangePassword from "../../member/components/change-password/ChangePassword";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { getCurrentMember } from "../../shared/sharedMethod";
import { toggleChangeLanguageModal } from "../../store/action/changeLanguageModalAction";
import { toggleChangePasswordModal } from "../../store/action/changePasswordModalAction";
import Header from "./Header";
import Footer from "./Footer";

function LibraryInfo() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);
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
            name: "How to manage eResources Section of E-Library for admins",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/How to manage eResources Section of E-Library for admins.mp4",
            image_name:
                "How to manage eResources Section of E-Library for admins",
        },

        {
            name: "What are eResources for members",
            url: "https://dindayalupadhyay.smartcitylibrary.com/public/uploads/tutorial-videos/What are eResources for members.mp4",
            image_name: "What are eResources for members",
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
        <div>
            <ProgressBar />
            <Header />
            <section className="video-list">
                <div className="container">
                    <div className="section-title-center text-center">
                        <h2 className="display-6">How it works</h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

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

            <div className="fab-wrapper">
                <input
                    id="fabCheckbox"
                    type="checkbox"
                    className="fab-checkbox"
                />
                <label className="fab" for="fabCheckbox">
                    <span className="fab-dots fab-dots-1"></span>
                    <span className="fab-dots fab-dots-2"></span>
                    <span className="fab-dots fab-dots-3"></span>
                </label>
                <div className="fab-wheel">
                    <a className="fab-action fab-action-1" href="#/contact-us">
                        <i className="fas fa-question"></i>
                    </a>
                    <a className="fab-action fab-action-2" href="#/eresources">
                        <i className="fas fa-book"></i>
                    </a>
                    <a className="fab-action fab-action-3" href="#/about">
                        <i className="fas fa-address-book"></i>
                    </a>
                    {/*  <a className="fab-action fab-action-4" href="#/about">
                        <i className="fas fa-info"></i>
                    </a> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LibraryInfo;
