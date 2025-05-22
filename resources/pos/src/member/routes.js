import React, { lazy } from "react";
import AuthorsBooks from "../components/newMemberApp/AuthorsBooks";
// import MemberPlan from "./components/memberplan/MemberPlan";

//routes

const Books = lazy(() => import("./components/book-search/BookSearch"));
const MemberProfile = lazy(() =>
    import("./components/member-profile/MemberProfile")
);
const BookHistory = lazy(() => import("./components/book-history/BookHistory"));
const BookRequests = lazy(() =>
    import("./components/book-requests/BookRequests")
);
const Ebooks = lazy(() => import("./components/E-books/Ebooks"));
const MemberPlan = lazy(() => import("./components/memberplan/MemberPlan"));
const MemberPlanOtherLibrary = lazy(() =>
    import("./components/memberplan/MemberPlanOtherLibrary")
);
const Transaction = lazy(() =>
    import("./components/transactions/Transactions")
);
const CurrentPlan = lazy(() =>
    import("./components/current-membership-plan/CurrentPlan")
);
const MemberShipPlanMethod = lazy(() =>
    import("./components/memberplan/MemberShipPlanMethod")
);

export default [
    // {
    //     path: "/books",
    //     exact: true,
    //     name: "Books",
    //     component: Books,
    // },
    {
        path: "/book-history",
        name: "Book History",
        component: BookHistory,
    },
    {
        path: "/member-profile",
        name: "MemberProfile",
        component: MemberProfile,
    },
    {
        path: "/book-requests",
        name: "BookRequests",
        component: BookRequests,
    },
    {
        path: "/e-books",
        name: "E-Books",
        component: Ebooks,
    },
    {
        path: "/member-plan",
        name: "MemberPlan",
        component: MemberPlan,
    },
    {
        path: "/member-plan-other-library/:libraryIdNew",
        name: "MemberPlanOtherLibrary",
        component: MemberPlanOtherLibrary,
    },
    {
        path: "/member-transactions",
        name: "Transaction",
        component: Transaction,
    },
    {
        path: "/current-plan",
        name: "CurrentPlan",
        component: CurrentPlan,
    },

    {
        path: "/member-plan/method/:id",
        name: "MemberShipPlanMethod",
        component: MemberShipPlanMethod,
    },
    {
        path: "/books/author/:id",
        name: "AuthorsBooks",
        component: AuthorsBooks,
    },
];
