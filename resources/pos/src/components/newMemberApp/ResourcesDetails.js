import React, { useEffect, useState } from "react";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { resourceExcelAction } from "../../store/action/resourcesAction";

import { fetchResources } from "../../store/action/resourcesAction2";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
import { getCurrentMember } from "../../shared/sharedMethod";
import ReactDataTable from "../../shared/table/ReactDataTable";
import ResourcePDFModal from "./ResourcePDFModal";
import { Button } from "reactstrap";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceVideoModal from "./ResourceVideoModal";

function ResourcesDetails(props) {
    const {
        fetchResources,
        fetchResourceCategory,
        resources,
        resourceCategory,
        resourceExcelAction,
        isLoading,
    } = props;
    const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [videoFilePath, setVideoFilePath] = useState("");
    const [videoModal, setVideoModal] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [itemsValue, setItemsValue] = useState([]);
    const [isSpinner, setIsSpinner] = useState(true);
    const member = getCurrentMember();
    const location = useLocation();
    const navigate = useNavigate();

    const toggle = () => setModal(!modal);

    const onChange = (filter) => {
        fetchResources(filter, true);
        fetchResourceCategory();
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    const categoryOnChange = (e) => setCategoryId(e.target.value);
    useEffect(() => {
        fetchResources();
    }, []);

    /* useEffect(() => {
        const itemsValue =
            resources.length && resourceCategory.length
                ? resources.map((resource) => {
                      return {
                          id: resource.id,
                          title: resource.title,
                          category: resourceCategory.length
                              ? resourceCategory.find(
                                    (category) =>
                                        category.id == resource.category_id
                                )
                              : "",
                          file: resource.file_content,
                          note: resource.note ? resource.note : "N/A",
                          url: resource.url ? resource.url : "N/A",
                      };
                  })
                : [];
        if (categoryId) {
            setItemsValue(
                itemsValue.filter((item) => item.category.id == categoryId)
            );
        } else {
            setItemsValue(itemsValue);
        }
    }, []); */

    const params = useParams();
    const { id } = params;

    const getFileType = (filename) => {
        const extension = filename.split(".").pop();
        if (["mp4", "webm", "ogg"].includes(extension)) {
            return "video";
        } else if (["pdf"].includes(extension)) {
            return "pdf";
        }
        // Add more file types as needed
        return "unknown";
    };

    const columns = [
        /* {
            sortable: true,
            wrap: true,
            selector: (row) =>
                row.book_item.book ? row.book_item.book.library_id : "N/A",
            name: "LIBRARY",
            cell: (row) =>
                row.book_item.book
                    ? libraryStatus.find(
                          (status) =>
                              row.book_item.book.library_id === status.id
                      ).name
                    : "N/A",
        }, */

        {
            name: "Title",
            selector: (row) => row.title,
            width: "200px",
            sortable: true,
            cell: (row) => <span>{row.title}</span>,
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            cell: (row) => (
                <span className="book-name">{row.category.name}</span>
            ),
        },
        {
            name: "URL",
            selector: (row) => (row.url ? row.url : null),
            sortable: true,
            cell: (row) => (
                <span className="book-name">
                    <a target="_blank" href={row.url}>
                        {row.url}
                    </a>
                </span>
            ),
        },
        {
            name: "Description",
            selector: (row) => row.note,
            sortable: true,
            cell: (row) => <span>{row.note}</span>,
        },

        {
            name: "Action",
            selector: (row) => row.category.id,
            width: "300px",
            sortable: true,
            cell: (row) => (
                <Button
                    size="sm"
                    color="danger text-white"
                    onClick={(e) => {
                        if (
                            row.file.includes("mp3") ||
                            row.file.includes("mp4")
                        ) {
                            setVideoFilePath(row.file);
                            setVideoModal((prev) => !prev);
                        } else if (
                            row.file.includes("xlsx") ||
                            row.file.includes("txt") ||
                            row.file.includes("docx")
                        ) {
                            resourceExcelAction(row.id);
                        } else {
                            setFilePath(row.file);
                            toggle();
                        }
                    }}
                    disabled={row.file ? false : true}
                >
                    {row.file.includes("mp3") || row.file.includes("mp4") ? (
                        <FontAwesomeIcon icon={faPlay} />
                    ) : row.file.includes("xlsx") ||
                      row.file.includes("txt") ||
                      row.file.includes("docx") ? (
                        "Download"
                    ) : (
                        "Read"
                    )}
                </Button>
            ),
        },
    ];

    const pdfModalOptions = {
        modal,
        toggle,
        filePath: filePath,
    };

    function isYouTubeLink(url) {
        return url.includes("youtube.com") || url.includes("youtu.be");
    }

    function isVimeoLink(url) {
        return url.includes("vimeo.com");
    }

    function generateYouTubeEmbedUrl(url) {
        const videoId = url.split("v=")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    function generateVimeoEmbedUrl(url) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
    }

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 500);
    }, []);

    const [selectedCategory, setSelectedCategory] = useState("one");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <ProgressBar />
            <Header />
            <section id="resources-list">
                <div className="container">
                    <div className="tab-content text-center">
                        <div
                            className={`tab-pane ${
                                selectedCategory === "one" ? "active" : ""
                            }`}
                            id="one"
                            role="tabpanel"
                        >
                            <div className="module">
                                {resources
                                    .filter((item) => item.id == id)
                                    .map((item) => (
                                        <article
                                            className="tag-guides sal-animate"
                                            data-sal="zoom-in"
                                            data-sal-duration="100"
                                            data-sal-delay="100"
                                            key={item.id}
                                        >
                                            <h5>
                                                {" "}
                                                {item.category_id == 1
                                                    ? "Documents"
                                                    : ""}
                                                {item.category_id == 2
                                                    ? "Multimedia"
                                                    : ""}
                                                {item.category_id == 3
                                                    ? "Quick Links"
                                                    : ""}
                                            </h5>
                                            <h4 className=" guides-button">
                                                {item.title ? item.title : ""}
                                            </h4>
                                            <p>{item.note ? item.note : ""}</p>
                                            {item.file_content ? (
                                                getFileType(
                                                    item.file_content
                                                ) === "video" ? (
                                                    <div className="video-container">
                                                        <video controls>
                                                            <source
                                                                src={`https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/${item.file_content}`}
                                                                type="video/mp4"
                                                            />
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                    </div>
                                                ) : member ? (
                                                    <a
                                                        href={`https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/${item.file_content}`}
                                                        download
                                                        className="button guides-button"
                                                    >
                                                        Download Document
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`/#/lms/login`}
                                                        className="button guides-button"
                                                    >
                                                        Download Document
                                                    </a>
                                                )
                                            ) : (
                                                ""
                                            )}

                                            {item.url ? (
                                                <>
                                                    {item.url.includes(
                                                        "youtube.com"
                                                    ) ||
                                                    item.url.includes(
                                                        "youtu.be"
                                                    ) ? (
                                                        <iframe
                                                            title="YouTube video player"
                                                            className="button guides-button"
                                                            src={generateYouTubeEmbedUrl(
                                                                item.url
                                                            )}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    ) : item.url.includes(
                                                          "vimeo.com"
                                                      ) ? (
                                                        <iframe
                                                            title="Vimeo video player"
                                                            className="button guides-button"
                                                            src={generateVimeoEmbedUrl(
                                                                item.url
                                                            )}
                                                            width="560"
                                                            height="315"
                                                            frameBorder="0"
                                                            allow="autoplay; fullscreen"
                                                            allowFullScreen
                                                        ></iframe>
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            ) : (
                                                ""
                                            )}

                                            {!item.file_content ? (
                                                <a
                                                    href={
                                                        item.url
                                                            ? item.url
                                                            : "#"
                                                    }
                                                    className="button guides-button"
                                                    target="_blank"
                                                >
                                                    Visit
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </article>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <br />
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { resources, resourceCategory, isLoading } = state;
    return {
        resources,
        resourceCategory,
        isLoading,
    };
};

export default connect(mapStateToProps, {
    fetchResources,
    fetchResourceCategory,
    resourceExcelAction,
})(ResourcesDetails);
