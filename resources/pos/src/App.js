import React, { useEffect } from "react";
import { Route, useLocation, Navigate, Routes } from "react-router-dom";
import "../../pos/src/assets/sass/style.react.scss";
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { settingsKey, Tokens } from "./constants";
import Toasts from "./shared/toast/Toasts";
import localeData from "./locales";
import { fetchFrontSetting } from "./store/action/frontSettingAction";
import { fetchConfig } from "./store/action/configAction";
import { addRTLSupport } from "./shared/sharedMethod";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import AdminApp from "./AdminApp";

import { fetchSettings } from "../../../resources/pos/src/admin/store/actions/settingAction";
import { fetchAppSetting } from "../../../resources/pos/src/admin/store/actions/appSettingAction";
import PDFReader from "./components/newMemberApp/PdfReader/PDFReader";

function App() {
    //do not remove updateLanguage
    const dispatch = useDispatch();
    const location = useLocation();
    const token = localStorage.getItem(Tokens.ADMIN);
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);
    const { selectedLanguage, updateLanguage, config } = useSelector(
        (state) => state
    );
    const messages =
        localeData[updatedLanguage ? updatedLanguage : selectedLanguage];

    useEffect(() => {
        selectCSS();
    }, [location.pathname]);

    useEffect(() => {
        if (token) {
            dispatch(fetchConfig());
            dispatch(fetchFrontSetting());
            dispatch(fetchAppSetting());
            dispatch(fetchSettings(true));
        }
    }, []);

    useEffect(() => {
        addRTLSupport(updatedLanguage ? updatedLanguage : selectedLanguage);
    }, [updatedLanguage, selectedLanguage]);

    const selectCSS = () => {
        if (updatedLanguage === "ar") {
            require("./assets/css/custom.rtl.css");
            require("./assets/css/style.rtl.css");
            require("./assets/css/frontend.rtl.css");
            require("./assets/css/mycustomcss.css");
        } else {
            require("./assets/css/custom.css");
            require("./assets/css/style.css");
            require("./assets/css/frontend.css");
            require("./assets/css/mycustomcss.css");
        }
    };

    return (
        <div className="d-flex flex-column flex-root">
            <IntlProvider
                locale={settingsKey.DEFAULT_LOCALE}
                messages={messages}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="reset-password/:token/:email"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="pos/*"
                        element={<AdminApp config={config} />}
                    />
                    <Route
                        path="/"
                        element={
                            <Navigate
                                replace
                                to={
                                    token
                                        ? "/admin/pos/lms-dashboard"
                                        : "/admin/login"
                                }
                            />
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate replace to={"/admin"} />}
                    />
                </Routes>
                <Toasts
                    language={
                        updatedLanguage ? updatedLanguage : selectedLanguage
                    }
                />
            </IntlProvider>
        </div>
    );
}

export default App;
