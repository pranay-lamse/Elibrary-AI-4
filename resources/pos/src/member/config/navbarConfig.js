import React from "react";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { CNavItem } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: getFormattedMessage("books.title"),
        to: "/lms/books",
        icon: <i className="fa fa-book nav-icons" />,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("book-history.title"),
        to: "/lms/book-history",
        icon: <i className="fas fa-book-reader nav-icons" />,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("book-request.title"),
        to: "/lms/book-requests",
        icon: <i className="fas fa-book nav-icons" />,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("e-book.title"),
        to: "/lms/e-books",
        icon: <i className="fas fa-book nav-icons" />,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("transaction.title"),
        to: "/lms/member-transactions",
        icon: <i className="fa fa-money nav-icons" />,
    },
];
export default _nav;
