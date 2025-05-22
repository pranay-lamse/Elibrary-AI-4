import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChangeLanguage from "../../member/components/change-language/ChangeLanguage";
import ChangePassword from "../../member/components/change-password/ChangePassword";
import { getCurrentMember } from "../../shared/sharedMethod";
import { toggleChangeLanguageModal } from "../../store/action/changeLanguageModalAction";
import { toggleChangePasswordModal } from "../../store/action/changePasswordModalAction";
import { addToast, displayMessage } from "../../store/action/toastAction";
import { useNavigate } from "react-router";

const Header = (props) => {
    const [toggleOpen, setToggle] = useState(true);
    const dispatch = useDispatch();
    const member = getCurrentMember();
    const navigate = useNavigate();
    const isMemberLogout = localStorage.getItem("isMemberLogout");

    const cardModalProps = { toggleChangePasswordModal };
    const languageModalProps = { toggleChangeLanguageModal };

    const passwordToggle = () => {
        dispatch(toggleChangePasswordModal());
        setToggle(true);
    };

    const languageToggle = () => {
        dispatch(toggleChangeLanguageModal());
        setToggle(false);
    };

    const onLogout = () => {
        localStorage.removeItem("member");
        localStorage.removeItem("memberToken");
        localStorage.setItem("isMemberLogout", "true");
        dispatch(
            addToast({
                text: "Logout successfully",
            })
        );
        navigate("/");
    };

    return (
        <>
            <header id="header-section">
                <nav
                    className="navbar navbar-expand-lg pl-3 pl-sm-0"
                    id="navbar"
                >
                    <div className="container">
                        <div className="navbar-brand-wrapper d-flex w-100">
                            <a href="/">
                                <img
                                    src="images/elibrary.png"
                                    alt=""
                                    width={150}
                                    height="auto"
                                />
                            </a>
                            <button
                                className="navbar-toggler ml-auto"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="mdi mdi-menu"></span>
                            </button>
                        </div>
                        <div
                            className="collapse navbar-collapse navbar-menu-wrapper"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav align-items-lg-center align-items-start ml-auto">
                                <li className="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                                    <div className="navbar-collapse-logo">
                                        <img
                                            src="images/elibrary.png"
                                            alt=""
                                            width={150}
                                            height="auto"
                                        />
                                    </div>
                                    <button
                                        className="navbar-toggler close-button"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="mdi mdi-close pl-5"></span>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link cursor-pointer"
                                        onClick={() => (location.hash = "/")}
                                    >
                                        Home{" "}
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/books-list">
                                        Books
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#/about">
                                        About
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/contact-us">
                                        Contact
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/eresources">
                                        eResources
                                    </a>
                                </li>

                                {isMemberLogout || !member ? (
                                    <li className="nav-item btn-contact-us pl-4 pl-lg-0">
                                        <button
                                            className="btn btn-danger frontend-btn"
                                            style={{ color: "white" }}
                                            onClick={() =>
                                                (location.hash = "/lms/login")
                                            }
                                        >
                                            <span> Login</span>
                                        </button>
                                    </li>
                                ) : (
                                    member && (
                                        <li className="d-flex align-items-center justify-content-center nav-item btn-contact-us pl-4 pl-lg-0">
                                            <div className="dropdown mr-3">
                                                <button
                                                    className="btn frontend-btn  dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <span> My Account</span>
                                                </button>
                                                <div
                                                    className="dropdown-menu mt-1"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    {member?.subscription
                                                        ?.ebook_status == 1 ? (
                                                        <a
                                                            className="dropdown-item"
                                                            href="http://smartcityngp.kopykitab.com"
                                                            target="_blank"
                                                        >
                                                            <i className="fas fa-globe nav-icons pr-2"></i>{" "}
                                                            E-Book Library
                                                        </a>
                                                    ) : (
                                                        <a
                                                            className="dropdown-item"
                                                            href="#/lms/current-plan"
                                                        >
                                                            <i className="fas fa-globe nav-icons pr-2"></i>{" "}
                                                            E-Book Library
                                                        </a>
                                                    )}
                                                    <a
                                                        className="dropdown-item"
                                                        href="#/lms/book-history"
                                                    >
                                                        <i className="fas fa-book-reader nav-icons pr-2"></i>{" "}
                                                        Book history
                                                    </a>

                                                    <a
                                                        className="dropdown-item"
                                                        href="#/lms/e-books"
                                                    >
                                                        <i className="fas fa-book nav-icons pr-2"></i>{" "}
                                                        My E-Books
                                                    </a>

                                                    <a
                                                        className="dropdown-item"
                                                        href="#/lms/member-transactions"
                                                    >
                                                        <i className="fa fa-money nav-icons pr-2 "></i>{" "}
                                                        Transactions
                                                    </a>
                                                </div>
                                            </div>
                                            <button
                                                className="navbar-toggler"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#navbar-list-4"
                                                aria-controls="navbarNav"
                                                aria-expanded="false"
                                                aria-label="Toggle navigation"
                                            >
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="nav-item dropdown">
                                                <button
                                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                                    id="navbarDropdownMenuLink"
                                                    role="button"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <img
                                                        src={
                                                            member.image_path
                                                                ? member.image_path
                                                                : "https://cdn-icons-png.flaticon.com/512/1144/1144709.png"
                                                        }
                                                        width="50"
                                                        height="50"
                                                        className="rounded-circle"
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <p className="px-2 pt-3">
                                                        {member.first_name +
                                                            " " +
                                                            member.last_name}
                                                    </p>
                                                </button>
                                                <div
                                                    className="dropdown-menu ml-3"
                                                    aria-labelledby="navbarDropdownMenuLink"
                                                >
                                                    <a
                                                        className="dropdown-item"
                                                        href="/#/lms/member-profile"
                                                    >
                                                        <i className="fa fa-cog nav-icons pr-2"></i>{" "}
                                                        Profile
                                                    </a>

                                                    <a
                                                        className="dropdown-item"
                                                        href="#/lms/current-plan"
                                                    >
                                                        <i className="fa fa-bookmark nav-icons pr-2"></i>{" "}
                                                        Membership plans
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            onLogout()
                                                        }
                                                    >
                                                        <i className="fa fa-lock nav-icons pr-2"></i>{" "}
                                                        Log Out
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {toggleOpen ? (
                <ChangePassword {...cardModalProps} />
            ) : (
                <ChangeLanguage {...languageModalProps} />
            )}
        </>
    );
};

export default React.memo(Header);
