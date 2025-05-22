import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import {
    CFooter,
    CSidebarBrand,
    CSidebarToggler,
    CHeader,
    CSidebar,
    CSidebarNav,
    CContainer,
} from "@coreui/react";
import PropTypes from "prop-types";
import navigation from "../../config/navbarConfig";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import routes from "../../routes";
import { loggedConstant, Routes, Tokens } from "../../constants/index";
import { checkExistingRoute } from "../../../shared/sharedMethod";
import { useDispatch, useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { AppSidebarNav } from "./AppSidebarNav";
import { useNavigate } from "react-router-dom";
import Hello from "../book-search/Hello";
import BookSearch from "../book-search/BookSearch";

// const Footer = lazy(() => import("./Footer"));
// const Header = lazy(() => import("./Header"));

import Header from "../../../components/newMemberApp/Header";
import Footer from "../../../components/newMemberApp/Footer";

const MemberLayout = (props) => {
    const { appName, appLogo, member, location } = props;
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="content-wrapper">
                <div className="body flex-grow-1 p-3 ">
                    <div className="container-fluid">
                        {renderMainSection(location, navigate, props)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const renderAppHeader = (props, navigate, appName, appLogo, member) => {
    const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("member");
        localStorage.removeItem(Tokens.MEMBER);
        localStorage.setItem(loggedConstant.IS_MEMBER_LOGOUT, "true");
        navigate("/");
    };
    return (
        <CHeader position="sticky" className="mb-4 bg-light">
            <CContainer fluid>
                <Suspense fallback={<ProgressBar />}>
                    <Header
                        history={props.history}
                        appName={appName}
                        member={member}
                        appLogo={appLogo}
                        onLogout={(e) => signOut(e)}
                    />
                </Suspense>
            </CContainer>
        </CHeader>
    );
};

const onGoHomePage = () => {
    window.location.href = "#/lms/landing";
};

const renderAppSidebar = (props) => {
    const { appName, appLogo } = props;
    const dispatch = useDispatch();
    const unfoldable = useSelector(
        (state) => state.sidebarReducer.sidebarUnfoldable
    );
    const sidebarShow = useSelector(
        (state) => state.sidebarReducer.sidebarShow
    );
    const show = useSelector((state) => state.sidebarReducer.sidebarShow);
    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: "SET", sidebarShow: visible });
            }}
        >
            <CSidebarBrand
                className="d-none d-md-flex cursor-pointer"
                to="#/lms/landing"
                onClick={() => onGoHomePage()}
            >
                <img
                    className="header__app-logo sidebar-brand-full"
                    src={appLogo}
                    alt={appLogo}
                />
                <a href="/">
                    <span className="ml-2 header__app-name sidebar-brand-full">
                        {appName}
                    </span>
                </a>
                <img
                    className="header__app-logo sidebar-brand-narrow"
                    src={appLogo}
                    alt={appLogo}
                />
            </CSidebarBrand>

            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() =>
                    dispatch({ type: "SET", sidebarUnfoldable: !unfoldable })
                }
            />
        </CSidebar>
    );
};

const renderMainSection = (location, navigate, props) => {
    return (
        <Suspense fallback={<ProgressBar />}>
            <Router>
                {renderRoutes(location, navigate, props)}
                <Route
                    path="/"
                    element={<Navigate replace to={Routes.MEMBER_HOME} />}
                />
            </Router>
        </Suspense>
    );
};

const renderRoutes = (location, navigate, props) => {
    return routes.map((route, index) => {
        return route.component ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.component {...props} />}
            />
        ) : null;
    });
};

const renderAppFooter = (appName) => {
    return (
        <CFooter className="footer-fix">
            <Suspense fallback={<ProgressBar />}>
                <Footer appName={appName} />
            </Suspense>
        </CFooter>
    );
};

MemberLayout.propTypes = {
    member: PropTypes.object,
    location: PropTypes.object,
    permissions: PropTypes.array,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default React.memo(MemberLayout);
