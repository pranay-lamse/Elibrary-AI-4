import React, { useState } from "react";
import {
    CDropdown,
    CSidebarBrand,
    CHeaderToggler,
    CHeaderNav,
    CDropdownMenu,
    CDropdownToggle,
    CDropdownItem,
} from "@coreui/react";
import PropTypes from "prop-types";
import { Routes } from "../../constants/index";
import {
    getAvatarName,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import ChangePassword from "../change-password/ChangePassword.js";
import ChangeLanguage from "../change-language/ChangeLanguage";
import { connect } from "react-redux";
import { toggleChangePasswordModal } from "../../../store/action/changePasswordModalAction";
import { toggleChangeLanguageModal } from "../../../store/action/changeLanguageModalAction";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";
import { Dropdown } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const MemberHeader = (props) => {
    const {
        member,
        history,
        appName,
        appLogo,
        toggleChangePasswordModal,
        toggleChangeLanguageModal,
    } = props;
    const navigate = useNavigate();
    const cardModalProps = { toggleChangePasswordModal };
    const languageModalProps = { toggleChangeLanguageModal };
    const [toggleOpen, setToggle] = useState(true);
    let imageUrl = null;

    const dispatch = useDispatch();
    const sidebarShow = useSelector(
        (state) => state.sidebarReducer.sidebarShow
    );

    if (member) {
        member.name = member.first_name;
        if (member.last_name) {
            member.name += " " + member.last_name;
        }
        if (member.image_path) {
            imageUrl = member.image_path;
        }
    }

    const goToMemberProfile = () => {
        navigate(Routes.MEMBER_PROFILE);
    };

    const toggle = () => {
        setToggle(true);
        toggleChangePasswordModal();
    };

    const languageToggle = () => {
        setToggle(false);
        toggleChangeLanguageModal();
    };

    const onClickMemberPlan = () => {
        setToggle(false);
        // toggleChangeLanguageModal();
        navigate(Routes.CURRENT_PLAN);
    };

    return (
        <>
            <CHeaderToggler
                className="ps-1"
                onClick={() =>
                    dispatch({ type: "SET", sidebarShow: !sidebarShow })
                }
            >
                <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CSidebarBrand className="header__sidebar-logo d-md-none">
                <a href="/">
                    <img
                        className="header__app-logo"
                        src={appLogo}
                        alt={appLogo}
                    />
                </a>
                <span className="ml-2 header__app-name">{appName}</span>
            </CSidebarBrand>
            <CHeaderNav className="ml-auto header__margin">
                <Dropdown variant="nav-item">
                    <Dropdown.Toggle
                        placement="bottom-end"
                        className=" py-0 shadow-none header__dropdown"
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                className="img-avatar header__img"
                                alt="user-avatar"
                            />
                        ) : (
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">
                                    {getAvatarName(member ? member.name : null)}
                                </span>
                            </div>
                        )}
                        <span className="mr-1 header__user-name text-dark">
                            {member ? member.name : null}
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        placement="bottom-end"
                        className="header__user-name pt-0"
                    >
                        <Dropdown.Item
                            onClick={goToMemberProfile}
                            className="header__border"
                        >
                            <i className="fa fa-cog header__user-icon" />
                            {getFormattedMessage("profile.title")}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={toggle}
                            className="header__border"
                        >
                            <i className="fa fa-lock header__user-icon" />
                            {getFormattedMessage("change-password.title")}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={languageToggle}
                            className="header__border"
                        >
                            <i className="fa fa-language header__user-icon" />
                            {getFormattedMessage("change-language.title")}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={onClickMemberPlan}
                            className="header__border"
                        >
                            <i className="fa fa-bookmark header__user-icon" />
                            {getFormattedMessage("membership-plan.title")}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => props.onLogout(e)}
                            className="header__border"
                        >
                            <i className="fa fa-lock header__user-icon" />
                            {getFormattedMessage("header.logout.title")}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    {toggleOpen ? (
                        <ChangePassword {...cardModalProps} />
                    ) : (
                        <ChangeLanguage {...languageModalProps} />
                    )}
                </Dropdown>
            </CHeaderNav>
        </>
    );
};

MemberHeader.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default connect(null, {
    toggleChangePasswordModal,
    toggleChangeLanguageModal,
})(MemberHeader);
