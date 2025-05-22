import React from 'react';
import {
    CSidebarBrand,
    CHeaderNav,
    CHeaderToggler
} from '@coreui/react';
import PropTypes from 'prop-types';
import {Routes} from "../../../constants";
import {getAvatarName, getFormattedMessage} from "../../../shared/sharedMethod";
import ChangePassword from "../change-password/ChangePassword";
import {connect} from "react-redux";
import {toggleChangePasswordModal} from "../../../store/action/changePasswordModalAction";
import {useSelector, useDispatch} from "react-redux";
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import {Dropdown} from "react-bootstrap";

const TheHeader = (props) => {
    const { user, history, appName, appLogo, toggleChangePasswordModal } = props;
    const cardModalProps = { toggleChangePasswordModal };
    const dispatch = useDispatch();
    const sidebarShow = useSelector(state => state.sidebarReducer.sidebarShow);

    let imageUrl = null;
    if (user) {
        user.name = user.first_name;
        if (user.last_name) {
            user.name += ' ' + user.last_name;
        }
        if (user.image_path) {
            imageUrl = user.image_path;
        }
    }

    const goToUserProfile = () => {
        history.push(Routes.USER_PROFILE);
    };

    const toggle = () => {
        toggleChangePasswordModal()
    };

    return (
        <>
            <CHeaderToggler className="ps-1"
                onClick={() => dispatch({ type: 'SET', sidebarShow: !sidebarShow })}>
                <CIcon icon={cilMenu} size="lg"/>
            </CHeaderToggler>
            <CSidebarBrand className="header__sidebar-logo d-md-none">
                <img className="header__app-logo" src={appLogo} alt={appLogo}/>
                <span className="ml-2 header__app-name">{appName}</span>
            </CSidebarBrand>
            <CHeaderNav className="ml-auto header__margin">
                <Dropdown variant="nav-item">
                    <Dropdown.Toggle placement="bottom-end" className=" py-0 shadow-none header__dropdown">
                        {imageUrl ? <img src={imageUrl} className="img-avatar header__img" alt="user-avatar"/> :
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">
                                    {getAvatarName(user ? user.name : null)}
                                </span>
                            </div>
                        }
                        <span className="mr-2 header__user-name">{user ? user.name : null}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu placement="bottom-end" className="header__user-name">
                        <Dropdown.Item onClick={goToUserProfile} className="header__border"><i className="fa fa-cog header__user-icon"/>
                            {getFormattedMessage('profile.title')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={toggle} className="header__border"><i className="fa fa-lock header__user-icon"/>
                            {getFormattedMessage('change-password.title')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={e => props.onLogout(e)} className="header__border"><i className="fa fa-sign-out header__user-icon"/>
                            {getFormattedMessage('header.logout.title')}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    <div className="d-flex justify-content-end">
                    </div>
                    <ChangePassword {...cardModalProps}/>
                </Dropdown>
            </CHeaderNav>
        </>
    );
};

TheHeader.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string
};

export default connect(null, { toggleChangePasswordModal })(TheHeader);
