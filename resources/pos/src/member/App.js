import React, { useEffect, lazy } from "react";
import PropTypes from "prop-types";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import LocaleData from "./locales";
import { fetchSettings } from "./store/actions/settingAction";
import { settingsKey } from "./constants";
import {
    appSettingsKey,
    LocalStorageKey,
    Routes,
    Tokens,
} from "./constants/index";
import { publicImagePath } from "../appConstant";
import ProgressBar from "../shared/progress-bar/ProgressBar";
import Toasts from "../shared/toast/Toasts";
import { addRTLSupport } from "../shared/sharedMethod";
import { fetchAppSetting } from "../store/action/appSettingAction";
import { getUserProfile } from "../store/action/localStorageAction";
import TestingApp from "../components/newMemberApp/TestingApp";
import UserBookDetails from "../components/newMemberApp/UserBookDetails";
import Books from "../components/newMemberApp/Books";
import Books2 from "../components/newMemberApp/Books2";
import EbookSubscription from "../components/newMemberApp/EbookSubscription";
import PDFReader from "../components/newMemberApp/PdfReader/PDFReader";
import EbookDetails from "../components/newMemberApp/EbookDetails";

import Layout from "./components/layout";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Registration from "./components/auth/registration/Registration";

import SearchCards from "../components/newMemberApp/SearchCards";
import AuthorsBooks from "../components/newMemberApp/AuthorsBooks";
import BookSeries from "../components/newMemberApp/BookSeries";

const MemberApp = (props) => {
    const {
        getUserProfile,
        settings,
        fetchAppSetting,
        appSetting,
        member,
        fetchSettings,
    } = props;
    const messages = settings[settingsKey.LANGUAGE]
        ? LocaleData[settings[settingsKey.LANGUAGE].value]
        : LocaleData[settingsKey.DEFAULT_LOCALE];
    const appName = appSetting[appSettingsKey.LIBRARY_NAME]
        ? appSetting[appSettingsKey.LIBRARY_NAME].value
        : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO]
        ? appSetting[appSettingsKey.LIBRARY_LOGO].logo_url
        : publicImagePath.APP_LOGO;
    const routeProps = { appLogo, appName, member };
    addRTLSupport(
        settings[settingsKey.LANGUAGE]
            ? settings[settingsKey.LANGUAGE].value
            : settingsKey.DEFAULT_LOCALE
    );

    useEffect(() => {
        fetchAppSetting();
        getUserProfile(LocalStorageKey.MEMBER);

        if (localStorage.getItem(Tokens.MEMBER)) {
            fetchSettings();
        }
    }, []);

    return (
        <IntlProvider locale={settingsKey.DEFAULT_LOCALE} messages={messages}>
            <React.Suspense fallback={<ProgressBar />}>
                <Switch>
                    {/*<Route exact={true} path={Routes.APP_HOME} name="Home" render={props => <Home {...props}/>}/>*/}
                    {/* <Route path="/*" element={<ChildrenRoutes />} /> */}

                    <Route
                        path="/"
                        name="home"
                        element={<TestingApp {...props} />}
                    />

                    <Route path="/view-book/:id" element={<PDFReader />} />
                    <Route
                        path="/books-list"
                        name="Books List"
                        element={<Books />}
                    />

                    <Route
                        path="/books-list2"
                        name="Books List2"
                        element={<Books2 />}
                    />

                    <Route
                        path="/ebook-details/:id/:library_id"
                        name="Ebook"
                        element={<EbookDetails />}
                    />

                    <Route
                        path="/book-series"
                        name="Book Series"
                        element={<BookSeries />}
                    />

                    <Route
                        path="/search-results"
                        name="search-results"
                        element={<SearchCards />}
                    />
                    <Route
                        path="/books/author/:id"
                        name="AuthorsBooks"
                        element={<AuthorsBooks />}
                    />
                    {/*  <Route
                        path="/eresources"
                        exact
                        name="resources"
                        element={<Resources />}
                    />

                    <Route
                        path="/eresources-details/:id"
                        name="resources"
                        element={<ResourcesDetails />}
                    /> */}

                    <Route
                        path="/search/:search?/:id?/:library_id?"
                        name="home"
                        element={<UserBookDetails />}
                    />
                    <Route
                        path="/lms/ebook-subscription/:id?/:library_id?"
                        name="home"
                        element={<EbookSubscription />}
                    />

                    <Route
                        path={Routes.MEMBER_LOGIN}
                        name="Login"
                        element={<Login {...props} />}
                    />
                    <Route
                        path={Routes.MEMBER_REGISTRATION}
                        name="registration"
                        element={<Registration {...props} />}
                    />
                    <Route
                        path={Routes.MEMBER_FORGOT_PASSWORD}
                        name="Forgot Password"
                        element={<ForgotPassword {...props} />}
                    />
                    <Route
                        path={Routes.MEMBER_RESET_PASSWORD}
                        name="Reset Password"
                        element={<ResetPassword {...props} />}
                    />
                    <Route
                        path="/lms/*"
                        element={<Layout {...props} {...routeProps} />}
                    />
                    {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
                </Switch>
                <Toasts
                    language={
                        settings[settingsKey.LANGUAGE]
                            ? settings[settingsKey.LANGUAGE].value
                            : null
                    }
                />
            </React.Suspense>
        </IntlProvider>
    );
};

MemberApp.propTypes = {
    member: PropTypes.object,
    appSetting: PropTypes.object,
    settings: PropTypes.object,
    getUserProfile: PropTypes.func,
    fetchAppSetting: PropTypes.func,
    sortAction: PropTypes.func,
    fetchSettings: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { profile, appSetting, settings } = state;
    return {
        member: profile,
        appSetting,
        settings,
    };
};

export default connect(mapStateToProps, {
    fetchSettings,
    getUserProfile,
    fetchAppSetting,
})(MemberApp);
