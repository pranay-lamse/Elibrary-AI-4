import React from "react";
import { Permissions } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPieChart,
    faUser,
    faTruck,
    faUserGroup,
    faHome,
    faBoxes,
    faPrint,
    faBookmark,
    faBoxOpen,
    faMoneyCheckDollar,
    faMoneyBills,
    faQuoteRight,
    faDollarSign,
    faReceipt,
    faArrowRight,
    faArrowLeft,
    faEnvelope,
    faCartShopping,
    faChartColumn,
    faGear,
    faMapLocation,
    faBasketShopping,
    faSms,
    faCube,
    faFile,
    faBook,
    faBookReader,
    faUserFriends,
    faLayerGroup,
    faAtlas,
    faGlobe,
    faTags,
    faHandPaper,
    faSwatchbook,
    faRupee,
    faCogs,
    faCog,
    faFrog,
    faTruckFast,
    faBoxTissue,
    faWindowRestore,
    faSquareCaretRight,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "../shared/sharedMethod";
import { ShieldLock } from "react-bootstrap-icons";

export default [
    {
        title: "elibrary.title",
        name: "Elibrary",
        fontIcon: <FontAwesomeIcon icon={faBook} />,
        to: "/admin/pos/erp",
        class: "d-flex",
        is_submenu: "true",
        permission: "",
        subPath: {
            lmsDashboardSubPath: "/admin/pos/lms-dashboard",
            booksSubPath: "/admin/pos/books",
            booksCirculationSubPath: "/admin/pos/books-circulation",
            membersSubPath: "/admin/pos/members",
            genresSubPath: "/admin/pos/genres",
            authorsSubPath: "/admin/pos/authors",
            publishersSubPath: "/admin/pos/publishers",
            bookLanguagesSubPath: "/admin/pos/book-languages",
            tagsSubPath: "/admin/pos/tags",
            membershipPlansSubPath: "/admin/pos/membership-plans",
            subscriptionsPlansSubPath: "/admin/pos/subscriptions",
            booksSeriesPlansSubPath: "/admin/pos/books-series",
            bookRequestsPlansSubPath: "/admin/pos/book-requests",
            penaltiesSubPath: "/admin/pos/penalties",
            lmsSettings: "/admin/pos/lms-settings",
        },
        subMenu: [
            {
                title: "LMSdashboard.title",
                name: "LMSdashboard",
                fontIcon: <FontAwesomeIcon icon={faPieChart} />,
                to: "/admin/pos/lms-dashboard",
                class: "d-flex",
                permission: "",
                items: [
                    {
                        title: getFormattedMessage("LMSdashboard.title"),
                        to: "/admin/pos/lms-dashboard",
                    },
                ],
            },

            {
                title: "books.title",
                name: "All books",
                fontIcon: <FontAwesomeIcon icon={faBook} />,
                to: "/admin/pos/books",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_BOOKS,
                subPath: {
                    masterBooksPath: "/admin/pos/books",
                    masterEbooksPath: "/admin/pos/ebooks",
                    masterBookSeriesPath: "/admin/pos/books-series",
                    masterBookRequestPath: "/admin/pos/book-requests",
                },
                subMenu: [
                    {
                        title: "books.title",
                        name: "All books",
                        fontIcon: <FontAwesomeIcon icon={faBook} />,
                        to: "/admin/pos/books",
                        class: "d-flex",
                        permission: Permissions.MANAGE_BOOKS,
                        items: [
                            {
                                title: getFormattedMessage("books.title"),
                                to: "/admin/pos/books",
                            },
                        ],
                    },
                    {
                        title: "E-Books",
                        name: "E-Books",
                        fontIcon: <FontAwesomeIcon icon={faBook} />,
                        to: "/admin/pos/ebooks",
                        class: "d-flex",
                        permission: Permissions.MANAGE_BOOKS,
                        items: [
                            {
                                title: getFormattedMessage("books.title"),
                                to: "/admin/pos/ebooks",
                            },
                        ],
                    },

                    {
                        title: "books-series.title",
                        name: "books-series",
                        fontIcon: <FontAwesomeIcon icon={faSwatchbook} />,
                        to: "/admin/pos/books-series",
                        class: "d-flex",
                        permission: Permissions.MANAGE_BOOK_SERIES,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "books-series.title"
                                ),
                                to: "/admin/pos/books-series",
                            },
                        ],
                    },
                    {
                        title: "book-request.title",
                        name: "book-request",
                        fontIcon: <FontAwesomeIcon icon={faBook} />,
                        to: "/admin/pos/book-requests",
                        class: "d-flex",
                        permission: Permissions.MANANGE_BOOK_REQUEST,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "book-request.title"
                                ),
                                to: "/admin/pos/book-request",
                            },
                        ],
                    },
                ],
            },

            {
                title: "books-circulation.title",
                name: "books-circulation",
                fontIcon: <FontAwesomeIcon icon={faBookReader} />,
                to: "/admin/pos/books-circulation",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANANGE_BOOK_REQUEST,
                subPath: {
                    masterBooksCirculationPath: "/admin/pos/books-circulation",
                    masterReservedPath: "/admin/pos/reserved-books",
                    masterIssueBookPath: "/admin/pos/issued-books",
                    masterPenaltiesBookPath: "/admin/pos/penalties",
                },
                subMenu: [
                    {
                        title: "Manage Circulation",
                        name: "Manage Circulation",
                        fontIcon: <FontAwesomeIcon icon={faBookReader} />,
                        to: "/admin/pos/books-circulation",
                        class: "d-flex",
                        permission: Permissions.MANANGE_BOOK_REQUEST,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "books-circulation.title"
                                ),
                                to: "/admin/pos/books-circulation",
                            },
                        ],
                    },
                    {
                        title: "reserved-books.title",
                        name: "Reserved books",
                        fontIcon: <FontAwesomeIcon icon={faWindowRestore} />,
                        to: "/admin/pos/reserved-books",
                        class: "d-flex",
                        permission: Permissions.MANANGE_BOOK_REQUEST,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "reserved-books.title"
                                ),
                                to: "/admin/pos/books",
                            },
                        ],
                    },
                    {
                        title: "issued-books.title",
                        name: "Issued books",
                        fontIcon: <FontAwesomeIcon icon={faSquareCaretRight} />,
                        to: "/admin/pos/issued-books",
                        class: "d-flex",
                        permission: Permissions.ISSUE_BOOKS,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "issued-books.title"
                                ),
                                to: "/admin/pos/books",
                            },
                        ],
                    },
                    {
                        title: "penalties.title",
                        name: "penalties",
                        fontIcon: <FontAwesomeIcon icon={faRupee} />,
                        to: "/admin/pos/penalties",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PENALTIES,
                        items: [
                            {
                                title: getFormattedMessage("penalties.title"),
                                to: "/admin/pos/penalties",
                            },
                        ],
                    },
                ],
            },

            {
                title: "Membership",
                name: "Membership",
                fontIcon: <FontAwesomeIcon icon={faLayerGroup} />,
                to: "/admin/pos/members",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_MEMBERS,
                subPath: {
                    masterSubPath: "/admin/pos/members",
                    masterMembershipPlansPath: "/admin/pos/membership-plans",
                },
                subMenu: [
                    {
                        title: "members.title",
                        name: "members",
                        fontIcon: <FontAwesomeIcon icon={faUser} />,
                        to: "/admin/pos/members",
                        class: "d-flex",
                        permission: Permissions.MANAGE_MEMBERS,
                        items: [
                            {
                                title: getFormattedMessage("members.title"),
                                to: "/admin/pos/members",
                            },
                        ],
                    },

                    {
                        title: "Attendance",
                        name: "Attendacne",
                        fontIcon: <FontAwesomeIcon icon={faUser} />,
                        to: "/admin/pos/attendance",
                        class: "d-flex",
                        permission: Permissions.MANAGE_MEMBERS,
                        items: [
                            {
                                title: getFormattedMessage("Attendance"),
                                to: "/admin/pos/attendance",
                            },
                        ],
                    },
                    {
                        title: "Plans",
                        name: "Plans",
                        fontIcon: <FontAwesomeIcon icon={faHandPaper} />,
                        to: "/admin/pos/membership-plans",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PLANS,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "membership-plans.title"
                                ),
                                to: "/admin/pos/membership-plans",
                            },
                        ],
                    },
                    {
                        title: "Transactions",
                        name: "Transactions",
                        fontIcon: <FontAwesomeIcon icon={faHandPaper} />,
                        to: "/admin/pos/transactions",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PLANS,

                        items: [
                            {
                                title: getFormattedMessage(
                                    "Transactions"
                                ),
                                to: "/admin/pos/transactions",
                            },
                        ],
                    },
                ],
            },

            {
                title: "subscription.title",
                name: "subscription",
                fontIcon: <FontAwesomeIcon icon={faHandPaper} />,
                to: "/admin/pos/subscriptions",
                class: "d-flex",
                permission: Permissions.MANAGE_SUBSCRIPTIONS,
                items: [
                    {
                        title: getFormattedMessage("subscription.title"),
                        to: "/admin/pos/subscriptions",
                    },
                ],
            },

            {
                title: "Resources",
                name: "Resources",
                fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                to: "/admin/pos/resources",
                class: "d-flex",
                is_submenu: "true",
                permission: "",
                subPath: {
                    masterResourcesBooksPath: "/admin/pos/resources",
                    masterResourcesCategoryPath: "/admin/pos/resource-category",
                },
                subMenu: [
                    {
                        title: "resources.title",
                        name: "resources",
                        fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                        to: "/admin/pos/resources",
                        class: "d-flex",
                        permission: "",
                        items: [
                            {
                                title: getFormattedMessage("resources.title"),
                                to: "/admin/pos/resources",
                            },
                        ],
                    },
                    {
                        title: "resource.category.title",
                        name: "tags",
                        fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                        to: "/admin/pos/resource-category",
                        class: "d-flex",
                        permission: "",
                        items: [
                            {
                                title: getFormattedMessage(
                                    "resource.category.title"
                                ),
                                to: "/admin/pos/resource-category",
                            },
                        ],
                    },
                ],
            },

            {
                title: "transfers.title",
                name: "Transfer Books",
                fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                to: "/admin/pos/transfers",
                class: "d-flex",
                is_submenu: "true",
                subPath: {
                    customerSubPath: "/admin/pos/transfers",
                    userSubPath: "/admin/pos/received",
                },
                permission: Permissions.MANAGE_TRANSFERS,
                subMenu: [
                    {
                        title: "Transferred",
                        name: "Transferred",
                        fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                        to: "/admin/pos/transfers",
                        class: "d-flex",
                        permission: Permissions.MANAGE_TRANSFERS,
                        items: [
                            {
                                title: getFormattedMessage("transfers.title"),
                                to: "/admin/pos/transfers",
                            },
                        ],
                    },
                    {
                        title: "Received",
                        name: "Received ",
                        fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                        to: "/admin/pos/received",
                        class: "d-flex",
                        permission: Permissions.MANAGE_TRANSFERS,
                        items: [
                            {
                                title: getFormattedMessage("Received"),
                                to: "/admin/pos/received",
                            },
                        ],
                    },
                ],
            },

            {
                title: "Admin",
                name: "Admin",
                fontIcon: <FontAwesomeIcon icon={faLayerGroup} />,
                to: "/admin/pos/genres",
                class: "d-flex",
                is_submenu: "true",
                permission: "",
                subPath: {
                    masterSubPath: "/admin/pos/genres",
                    masterAuthorsPath: "/admin/pos/authors",
                    masterPublishersPath: "/admin/pos/publishers",
                    masterBookLanguagesPath: "/admin/pos/book-languages",
                    masterTagsPath: "/admin/pos/tags",
                },
                subMenu: [
                    {
                        title: "genres.title",
                        name: "genres",
                        fontIcon: <FontAwesomeIcon icon={faUser} />,
                        to: "/admin/pos/genres",
                        class: "d-flex",
                        permission: Permissions.MANAGE_GENRES,
                        items: [
                            {
                                title: getFormattedMessage("genres.title"),
                                to: "/admin/pos/genres",
                            },
                        ],
                    },
                    {
                        title: "authors.title",
                        name: "authors",
                        fontIcon: <FontAwesomeIcon icon={faUserFriends} />,
                        to: "/admin/pos/authors",
                        class: "d-flex",
                        permission: Permissions.MANAGE_AUTHORS,
                        items: [
                            {
                                title: getFormattedMessage("authors.title"),
                                to: "/admin/pos/authors",
                            },
                        ],
                    },
                    {
                        title: "publishers.title",
                        name: "publishers",
                        fontIcon: <FontAwesomeIcon icon={faAtlas} />,
                        to: "/admin/pos/publishers",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PUBLISHERS,
                        items: [
                            {
                                title: getFormattedMessage("publishers.title"),
                                to: "/admin/pos/publishers",
                            },
                        ],
                    },
                    {
                        title: "book-languages.title",
                        name: "book-languages",
                        fontIcon: <FontAwesomeIcon icon={faGlobe} />,
                        to: "/admin/pos/book-languages",
                        class: "d-flex",
                        permission: Permissions.MANAGE_BOOK_LANGUAGES,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "book-languages.title"
                                ),
                                to: "/admin/pos/book-languages",
                            },
                        ],
                    },
                    {
                        title: "tags.title",
                        name: "tags",
                        fontIcon: <FontAwesomeIcon icon={faTags} />,
                        to: "/admin/pos/tags",
                        class: "d-flex",
                        permission: Permissions.MANAGE_TAGS,
                        items: [
                            {
                                title: getFormattedMessage("tags.title"),
                                to: "/admin/pos/tags",
                            },
                        ],
                    },
                ],
            },

            {
                title: "How It Works",
                name: "How It Works",
                fontIcon: <FontAwesomeIcon icon={faSquareCaretRight} />,
                to: "/admin/pos/how-it-work",
                class: "d-flex",
                permission: "",
                items: [
                    {
                        title: "How It Works",
                        to: "/admin/pos/how-it-work",
                    },
                ],
            },
            // {
            //     title: "contact.us.title",
            //     name: "contact",
            //     fontIcon: <FontAwesomeIcon icon={faPhone} />,
            //     to: "/admin/pos/ ",
            //     class: "d-flex",
            //     permission: "",
            //     items: [
            //         {
            //             title: getFormattedMessage("contact.us.title"),
            //             to: "/admin/pos/contacts",
            //         },
            //     ],
            // },
            // {
            //     title: "cms.title",
            //     name: "CMS",
            //     fontIcon: <FontAwesomeIcon icon={faLayerGroup} />,
            //     to: "/admin/pos/lms-settings",
            //     class: "d-flex",
            //     is_submenu: "true",
            //     permission: Permissions.MANAGE_SETTINGS,
            //     subPath: {
            //         cmsSubPath: "/admin/pos/lms-settings",
            //         cmsHomeSettingSubPath: "/admin/pos/lms-home-settings",
            //         cmsTestimonialsSubPath: "/admin/pos/lms-testimonials",
            //     },
            //     subMenu: [
            //         {
            //             title: "settings.title",
            //             name: "LMSsettings",
            //             fontIcon: <FontAwesomeIcon icon={faGear} />,
            //             to: "/admin/pos/lms-settings",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SETTING,
            //         },
            //         {
            //             title: "home-settings.title",
            //             name: "HomeSettings",
            //             fontIcon: <FontAwesomeIcon icon={faCogs} />,
            //             to: "/admin/pos/lms-home-settings",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SETTING,
            //         },
            //         {
            //             title: "testimonials.title",
            //             name: "Testimonials",
            //             fontIcon: <FontAwesomeIcon icon={faQuoteRight} />,
            //             to: "/admin/pos/lms-testimonials",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SETTING,
            //         },
            //     ],
            // },
        ],
    },
];
