import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import SettingsForm from "./SettingsForm";
import { languageOptions, settingsKey } from "../../constants";
import { publicImagePathURL } from "../../appConstant";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod";

import {
    fetchCurrencies,
    fetchSettings,
    postAppLogo,
    postSettings,
    postAppFavicon,
} from "../../admin/store/actions/settingAction";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const Settings = (props) => {
    const {
        currencies,
        fetchSettings,
        fetchCurrencies,
        postSettings,
        postAppLogo,
        selectedCurrency,
        lmsSettings,
        selectedLanguage,
        exist_library_logo,
        exist_favicon_logo,
        postAppFavicon,
    } = props;

    const bookLanguagesOptions = getFormattedOptions(languageOptions);

    useEffect(() => {
        fetchSettings(true);
        fetchCurrencies();
    }, []);

    const onSaveSettings = (formValues) => {
        postSettings([...formValues, exist_library_logo, exist_favicon_logo]);
    };

    const onChangeAppLogo = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append("logo", file, file.name);
            postAppLogo(formData);
        }
    };

    const onChangeAppFavicon = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append("favicon", file, file.name);
            postAppFavicon(formData);
        }
    };

    const getLogo = (settings, key) => {
        return settings && settings[key] ? settings[key].logo_url : null;
    };

    const prepareFormOption = {
        currencies,
        initialValues: {
            currency: selectedCurrency,
            issue_due_days: lmsSettings[settingsKey.ISSUE_DUE_DAYS]
                ? lmsSettings[settingsKey.ISSUE_DUE_DAYS].value
                : null,
            stripe_key: lmsSettings[settingsKey.STRIPE_KEY]
                ? lmsSettings[settingsKey.STRIPE_KEY].value
                : null,
            stripe_secret: lmsSettings[settingsKey.STRIPE_SECRET]
                ? lmsSettings[settingsKey.STRIPE_SECRET].value
                : null,
            return_due_days: lmsSettings[settingsKey.RETURN_DUE_DAYS]
                ? lmsSettings[settingsKey.RETURN_DUE_DAYS].value
                : null,
            issue_books_limit: lmsSettings[settingsKey.ISSUE_BOOKS_LIMIT]
                ? lmsSettings[settingsKey.ISSUE_BOOKS_LIMIT].value
                : null,
            reserve_books_limit: lmsSettings[settingsKey.RESERVE_BOOKS_LIMIT]
                ? lmsSettings[settingsKey.RESERVE_BOOKS_LIMIT].value
                : null,
            library_name: lmsSettings[settingsKey.LIBRARY_NAME]
                ? lmsSettings[settingsKey.LIBRARY_NAME].value
                : null,
            penalty_per_day: lmsSettings[settingsKey.PENALTY_PER_DAY]
                ? lmsSettings[settingsKey.PENALTY_PER_DAY].value
                : null,
            book_due_reminder_before_days: lmsSettings[
                settingsKey.BOOK_DUE_REMINDER_BEFORE_DAYS
            ]
                ? lmsSettings[settingsKey.BOOK_DUE_REMINDER_BEFORE_DAYS].value
                : null,
            library_logo: getLogo(lmsSettings, settingsKey.LIBRARY_LOGO),
            library_favicon: getLogo(lmsSettings, settingsKey.LIBRARY_FAVICON),
            language:
                selectedLanguage &&
                bookLanguagesOptions.find(
                    (lang) => lang.id == selectedLanguage.id
                ),
        },
        onSaveSettings,
        onChangeAppLogo,
        onChangeAppFavicon,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("settings.title")} />
            <div className="animated fadeIn">
                <ProgressBar />
                <HeaderTitle title="Settings" />
                <Row>
                    {/* <Col xs={12} className="mb-2">
                        <h5 className="page-heading">
                            {getFormattedMessage("settings.title")}
                        </h5>
                    </Col> */}
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <SettingsForm {...prepareFormOption} />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

Settings.propTypes = {
    selectedCurrency: PropTypes.object,
    selectedLanguage: PropTypes.object,
    exist_library_logo: PropTypes.object,
    exist_favicon_logo: PropTypes.object,
    settings: PropTypes.object,
    currencies: PropTypes.array,
    fetchSettings: PropTypes.func,
    fetchCurrencies: PropTypes.func,
    postSettings: PropTypes.func,
    postAppLogo: PropTypes.func,
    postAppFavicon: PropTypes.func,
};

const prepareCurrencies = (currencies) => {
    let currenciesArray = [];
    currencies.forEach((cur) =>
        currenciesArray.push({
            id: cur.iso_code,
            name: cur.country,
            symbol: cur.symbol,
        })
    );
    return currenciesArray;
};

const prepareSelectedSetting = (settings, filterKey) => {
    const setting = settings
        .filter((setting) => setting.key === filterKey)
        .map(({ value, display_name, currency_symbol }) => ({
            id: value,
            name: display_name,
            symbol: currency_symbol,
        }));
    if (setting.length > 0) {
        return {
            id: setting[0].id,
            name: setting[0].name,
            symbol: setting[0].symbol,
        };
    }
};

const mapStateToProps = (state) => {
    const { currencies, lmsSettings } = state;
    const settingsArray = Object.values(lmsSettings);
    const settingsArr = _.mapKeys(settingsArray, "key");
    return {
        currencies: prepareCurrencies(currencies),
        selectedCurrency: prepareSelectedSetting(
            settingsArray,
            settingsKey.CURRENCY
        ),
        lmsSettings: settingsArr,
        selectedLanguage: prepareSelectedSetting(
            settingsArray,
            settingsKey.LANGUAGE
        ),
        exist_library_logo: lmsSettings[settingsKey.LIBRARY_LOGO]
            ? lmsSettings[settingsKey.LIBRARY_LOGO]
            : null,
        exist_favicon_logo: lmsSettings[settingsKey.LIBRARY_FAVICON]
            ? lmsSettings[settingsKey.LIBRARY_FAVICON]
            : null,
    };
};

export default connect(mapStateToProps, {
    fetchSettings,
    fetchCurrencies,
    postSettings,
    postAppLogo,
    postAppFavicon,
})(Settings);
