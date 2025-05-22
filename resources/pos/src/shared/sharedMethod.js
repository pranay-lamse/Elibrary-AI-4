import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Navigate } from "react-router-dom";
import { Tokens } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { tokenValidation } from "../store/action/tokenValidationAction";
import moment from "moment";

export const prepareProfileData = (userProfile) => {
    const {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        phone,
        address,
        image,
        image_path,
        roles,
        membership_plan,
    } = userProfile;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
        image_path,
        phone,
        file_name: !!image,
    };
    if (roles) {
        changeAbleFields.role = {
            id: roles[0].id,
            name: roles[0].display_name,
        };
    }
    if (membership_plan) {
        changeAbleFields.membership_plan = membership_plan;
    }
    if (address) {
        const { address_1, address_2, country, city, state, zip } = address;
        changeAbleFields.address_1 = address_1 ? address_1 : "";
        changeAbleFields.address_2 = address_2 ? address_2 : "";
        changeAbleFields.country = country ? country : null;
        changeAbleFields.city = city ? city : "";
        changeAbleFields.state = state ? state : "";
        changeAbleFields.zip = zip ? zip : "";
    }
    return changeAbleFields;
};

export const prepareFullAddress = (address) => {
    let fullAddress = "";
    if (address) {
        if (address.address_1) {
            fullAddress += address.address_1;
        }
        if (address.address_2) {
            fullAddress += ",  " + address.address_2;
        }
        if (address.city) {
            fullAddress += ",  " + address.city;
        }
        if (address.state) {
            fullAddress += ",  " + address.state;
        }
        if (address.country) {
            fullAddress += ",  " + address.country.name;
        }
        if (address.zip) {
            fullAddress += "-" + address.zip;
        }
    }
    return fullAddress;
};

export const getAvatarName = (name) => {
    if (name) {
        return name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase())
            .join("");
    }
};

export const numValidate = (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
};

export const getFormattedMessage = (id) => {
    return <FormattedMessage id={id} defaultMessgae={id} />;
};

export const getFormattedMessageWithIntl = (id) => {
    const intl = useIntl();
    return intl.formatMessage({ id, defaultMessage: id });
};

export const getFormattedOptions = (options) => {
    const intl = useIntl();
    const copyOptions = _.cloneDeep(options);
    copyOptions.map(
        (option) =>
        (option.name = intl.formatMessage({
            id: option.name,
            defaultMessage: option.name,
        }))
    );
    return copyOptions;
};

export const placeholderText = (label) => {
    const intl = useIntl();
    const placeholderLabel = intl.formatMessage({ id: label });
    return placeholderLabel;
};

export const decimalValidate = (event) => {
    if (!/^\d*\.?\d*$/.test(event.key)) {
        event.preventDefault();
    }
};

export const addRTLSupport = (rtlLang) => {
    const html = document.getElementsByTagName("html")[0];
    const att = document.createAttribute("dir");
    att.value = "rtl";
    if (rtlLang === "ar") {
        html.setAttributeNode(att);
    } else {
        html.removeAttribute("dir");
    }
};

export const onFocusInput = (el) => {
    if (el.target.value === "0.00") {
        el.target.value = "";
    }
};

export const ProtectedRoute = (props) => {
    const { children } = props;
    const token = localStorage.getItem(Tokens.ADMIN);
    if (!token) {
        return <Navigate to="/admin/login" replace={true} />;
    } else {
        return children;
    }
};

// export const formatAmount = num => {
//     return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + ' K' : Math.sign(num) * Math.abs(num)
// };

export const formatAmount = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
};

export const currencySymbolHendling = (
    isRightside,
    currency,
    value,
    is_forment
) => {
    if (isRightside?.is_currency_right === "true") {
        if (is_forment) {
            return formatAmount(value) + " " + currency;
        } else {
            return parseFloat(value).toFixed(2) + " " + currency;
        }
    } else {
        if (is_forment) {
            return currency + " " + formatAmount(value);
        } else {
            return currency + " " + parseFloat(value).toFixed(2);
        }
    }
};

export const getFormattedDate = (date, config) => {
    const format = config && config.date_format;
    if (format === "d-m-y") {
        return moment(date).format("DD-MM-YYYY");
    } else if (format === "m-d-y") {
        return moment(date).format("MM-DD-YYYY");
    } else if (format === "y-m-d") {
        return moment(date).format("YYYY-MM-DD");
    } else if (format === "m/d/y") {
        return moment(date).format("MM/DD/YYYY");
    } else if (format === "d/m/y") {
        return moment(date).format("DD/MM/YYYY");
    } else if (format === "y/m/d") {
        return moment(date).format("YYYY/MM/DD");
    } else if (format === "m.d.y") {
        return moment(date).format("MM.DD.YYYY");
    } else if (format === "d.m.y") {
        return moment(date).format("DD.MM.YYYY");
    } else if (format === "y.m.d") {
        return moment(date).format("YYYY.MM.DD");
    } else moment(date).format("YYYY-MM-DD");
};

export const prepareFullNames = (members) => {
    let memberArray = [];
    if (!members) {
        return memberArray;
    }
    members.forEach((member) => {
        memberArray.push({
            id: member.id,
            name: member.first_name + " " + member.last_name,
        });
    });
    return memberArray;
};

export const getDynamicFormattedMessage = (id, values) => {
    return <FormattedMessage id={id} defaultMessgae={id} values={values} />;
};

export const priceFormatter = (price, format = "INR") => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: format,
    }).format(price);
};

export const dateFormatter = (date) => {
    if (!date) {
        return "";
    }
    return moment(date, "YYYY-MM-DD hh:mm:ss").format("Do MMM, YYYY");
};

export const getModalTitle = (
    isCreate,
    isEdit,
    isDelete,
    createTitle,
    editTitle,
    deleteTitle
) => {
    if (!isDelete) {
        return isCreate ? createTitle : editTitle;
    }
    return deleteTitle;
};

export const enableDisableUserInput = (event, digit) => {
    if (event.target.value.length > digit) {
        event.preventDefault();
    }
};

export const getCurrentMember = () => {
    return localStorage.getItem("member")
        ? JSON.parse(atob(localStorage.getItem("member")))
        : null;
};

export const getLocalStorageDataByEncryptKey = (keyName) => {
    return localStorage.getItem(keyName)
        ? JSON.parse(atob(localStorage.getItem(keyName)))
        : null;
};

export const checkExistingRoute = (lastLocation, history) => {
    history.listen((location) => {
        lastLocation = location;
    });
    const prevHistoryPush = history.push;
    history.push = (path) => {
        if (
            !lastLocation ||
            (path &&
                path.pathname !==
                lastLocation.pathname +
                lastLocation.search +
                lastLocation.hash)
        ) {
            prevHistoryPush(path);
        }
    };
};

export const getLocalStorageDataByKey = (keyName) => {
    return localStorage.getItem(keyName) ? localStorage.getItem(keyName) : null;
};

export const generateRandomNumber = (range, prepender) => {
    let randomString = "";
    if (prepender) {
        for (let i = 0; i < range - prepender.length; i++) {
            const randomNumber = Math.floor(Math.random() * range);
            randomString += randomNumber;
        }
    } else {
        for (let i = 0; i < range; i++) {
            const randomNumber = Math.floor(Math.random() * range);
            randomString += randomNumber;
        }
    }
    return prepender ? prepender + randomString : randomString;
};
