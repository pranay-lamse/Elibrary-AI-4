import 'simplebar/dist/simplebar.min.css'
import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {
    CFooter,
    CHeader,
    CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from '@coreui/react';
import PropTypes from 'prop-types';
import navigation from '../../config/navbarConfig';
import routes from "../../routes";
import {loggedConstant, Routes, Tokens} from "../../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {checkExistingRoute} from "../../../shared/sharedMethod";
import SimpleBar from 'simplebar-react'
import { AppSidebarNav } from './AppSidebarNav';

const TheFooter = lazy(() => import('./Footer'));
const TheHeader = lazy(() => import('./Header'));

const Layout = (props) => {
    const { permissions, appLogo, appName, user, location } = props;
    const newRoutes = prepareRoutes(permissions);

    if (permissions.length === 0) {
        return null;
    }

    return (
            <div>
                {renderAppSidebar(props, prepareNavigation(permissions))}
                {/*{renderAppSidebar(props)}*/}
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    {renderAppHeader(props, appName, appLogo, user)}
                    <div className="body flex-grow-1 p-4">
                        {renderMainSection(newRoutes, location)}
                    </div>
                    {renderAppFooter(appName)}
                </div>
            </div>
    );
};

const prepareRoutes = (permissions) => {
    let filterRoutes = [];
    routes.forEach((route) => {
        if (permissions.includes(route.permission) || route.permission === '') {
            filterRoutes.push(route)
        }
    });
    return filterRoutes;
};

const prepareNavigation = (permissions) => {
    let sideMenu = navigation;
    let routes = [];
    sideMenu.forEach(route => {
        if (permissions.includes(route.permission)) {
            routes.push(route);
        }
    });
    sideMenu = routes;
    sideMenu = sideMenu.slice();
    return sideMenu;
};

const renderAppHeader = (props, appName, appLogo, user) => {
    const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem(Tokens.ADMIN);
        localStorage.setItem(loggedConstant.IS_USER_LOGOUT, 'true');
        props.history.push(Routes.ADMIN_LOGIN);
    };
    return (
        <CHeader position="sticky" className="bg-light">
            <Suspense fallback={<ProgressBar/>}>
                <TheHeader history={props.history} appName={appName} user={user} appLogo={appLogo}
                        onLogout={e => signOut(e)}/>
            </Suspense>
        </CHeader>
    );
};

const onGoHomePage = () => {
    window.location.href = '#/app/landing';
};

const renderAppSidebar = (props, sideMenuList) => {
    const { appName, appLogo} = props;
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarReducer.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarReducer.sidebarShow)

    return (
        <CSidebar position="fixed" unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'SET', sidebarShow: visible })
            }}>
            <CSidebarBrand className="d-none d-md-flex cursor-pointer" to="#/app/landing" onClick={() => onGoHomePage()}>
                <img className="header__app-logo sidebar-brand-full" src={appLogo} alt={appLogo}/>
                <span className="ml-2 header__app-name sidebar-brand-full">{appName}</span>
                <img className="header__app-logo sidebar-brand-narrow" src={appLogo} alt={appLogo}/>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={sideMenuList} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch({ type: 'SET', sidebarUnfoldable: !unfoldable })}
            />
        </CSidebar>
    );
};

const renderMainSection = (newRoutes, location) => {
    return (
        <Suspense fallback={<ProgressBar/>}>
            <Switch>
                {renderRoutes(newRoutes, location)}
                <Redirect from="/" to={Routes.ADMIN_DEFAULT}/>
            </Switch>
        </Suspense>
    )
};

const renderRoutes = (newRoutes, location) => {
    return newRoutes.map((route, index) => {
        return route.component ? (
            <Route key={index} path={route.path} exact={route.exact} name={route.name} render={props => {
                checkExistingRoute(location, props.history);
                return localStorage.getItem(Tokens.ADMIN) ?
                    <route.component {...props}/> :
                    <Redirect to={Routes.ADMIN_LOGIN}/>
            }}/>
        ) : (null);
    });
};

const renderAppFooter = (appName) => {
    return (
        <CFooter className="footer-fix">
            <Suspense fallback={<ProgressBar/>}>
                <TheFooter appName={appName}/>
            </Suspense>
        </CFooter>
    );
};

Layout.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    permissions: PropTypes.array,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default React.memo(Layout);
