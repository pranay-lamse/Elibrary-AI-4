import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import AsideDefault from "./sidebar/asideDefault";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AsideTopSubMenuItem from "./sidebar/asideTopSubMenuItem";
import { Tokens } from "../constants";
// import asideConfig from "../config/asideConfig";
import erpConfig from "../config/erpConfig";
import elibraryConfig from "../config/elibraryConfig";
import elibraryConfig2 from "../config/elibraryConfig2";
import { environment } from "../config/environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchConfig } from "../store/action/configAction";
import { useNavigate } from "react-router";

const MasterLayout = (props) => {
    const {
        children,
        newPermissions,
        frontSetting,
        fetchConfig,
        config,
        allConfigData,
    } = props;
    const [isErp, setErp] = useState(
        JSON.parse(localStorage.getItem("isErp"))
            ? JSON.parse(localStorage.getItem("isErp"))
            : false
    );
    const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
    const [isMenuCollapse, setIsMenuCollapse] = useState(false);
    const newRoutes = config && prepareRoutes(config, isErp);
    const token = localStorage.getItem(Tokens.ADMIN);
    const [canManageElibrary, setCanManageElibrary] = useState(true);
    const [canManageErp, setCanManageErp] = useState(true);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (token) {
            fetchConfig();
        }
        if (!token) {
            window.location.href = environment.URL + "#" + "/admin/login";
        }
    }, []);
    // console.log({ isErp });

    const menuClick = () => {
        setIsResponsiveMenu(!isResponsiveMenu);
    };

    const menuIconClick = () => {
        setIsMenuCollapse(!isMenuCollapse);
    };

    // useLayoutEffect(() => {
    //     if (config.length) {
    //         const foundElibrary = config.find(
    //             (item) => item == "manage_elibrary"
    //         );
    //         const foundErp = config.find((item) => item == "manage_erp");
    //         if (foundElibrary) {
    //             setCanManageElibrary(true);
    //             // localStorage.setItem("isErp", false);
    //         }
    //         if (foundErp) {
    //             setCanManageErp(true);
    //             // localStorage.setItem("isErp", true);
    //         }
    //     }
    //     console.log({ isErp, canManageElibrary, canManageErp });
    // }, []);

    if (
        window.location.origin.toString() ==
        "https://dindayalupadhyay.smartcitylibrary.com"
    ) {
        var status_side_config = true;
    } else if (
        window.location.origin.toString() ==
        "https://kundanlalgupta.smartcitylibrary.com"
    ) {
        var status_side_config = false;
    } else if (
        window.location.origin.toString() ==
        "https://rashtramatakasturba.smartcitylibrary.com"
    ) {
        var status_side_config = false;
    } else {
        var status_side_config = true;
    }

    return (
        <div className="d-flex flex-row flex-column-fluid">
            <AsideDefault
                asideConfig={newRoutes}
                frontSetting={frontSetting}
                isResponsiveMenu={isResponsiveMenu}
                menuClick={menuClick}
                menuIconClick={menuIconClick}
                isMenuCollapse={isMenuCollapse}
            />
            <div
                className={`${
                    isMenuCollapse === true ? "wrapper-res" : "admin-wrapper"
                } d-flex flex-column flex-row-fluid`}
            >
                <div className="d-flex align-items-stretch justify-content-between header">
                    <div className="container-fluid d-flex justify-content-xxl-between flex-grow-1">
                        <button
                            type="button"
                            className="btn d-flex align-items-center d-xl-none px-0"
                            title="Show aside menu"
                            onClick={menuClick}
                        >
                            <FontAwesomeIcon icon={faBars} className="fs-1" />
                        </button>
                        {canManageElibrary ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setErp(false);
                                    navigate("/admin/pos/lms-dashboard");
                                    localStorage.setItem("isErp", false);
                                }}
                                className={`btn elibrary ${
                                    !isErp && "active_dash"
                                } bg-white mx-3`}
                            >
                                Elibrary
                            </button>
                        ) : null}

                        {canManageErp ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setErp(true);
                                    navigate("/admin/pos/pos-dashboard");
                                    localStorage.setItem("isErp", true);
                                }}
                                className={`btn erp ${
                                    isErp && "active_dash"
                                } bg-white mx-3`}
                            >
                                ERP
                            </button>
                        ) : null}

                        <AsideTopSubMenuItem
                            asideConfig={isErp ? erpConfig : elibraryConfig}
                        />

                        <Header newRoutes={newRoutes} />
                    </div>
                </div>
                <div className="content d-flex flex-column flex-column-fluid pt-7">
                    <div className="d-flex flex-column-fluid">
                        <div className="container-fluid">{children}</div>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <Footer
                        allConfigData={allConfigData}
                        frontSetting={frontSetting}
                    />
                </div>
            </div>
        </div>
    );
};

const getRouteWithSubMenu = (route, permissions) => {
    const subRoutes = route.subMenu
        ? route.subMenu.filter(
              (item) =>
                  permissions.indexOf(item.permission) !== -1 ||
                  item.permission === ""
          )
        : null;
    const newSubRoutes = subRoutes ? { ...route, newRoute: subRoutes } : route;
    return newSubRoutes;
};

const prepareRoutes = (config, isErp) => {
    const permissions = config;
    let filterRoutes = [];
    const asideConfig = isErp ? erpConfig : elibraryConfig;
    asideConfig.forEach((route) => {
        const permissionsRoute = getRouteWithSubMenu(route, permissions);
        if (
            (permissions && permissions.indexOf(route.permission) !== -1) ||
            route.permission === "" ||
            permissionsRoute.newRoute?.length
        ) {
            filterRoutes.push(permissionsRoute);
        }
    });
    return filterRoutes;
};

const mapStateToProps = (state) => {
    const newPermissions = [];
    const { permissions, settings, frontSetting, config, allConfigData } =
        state;

    if (permissions) {
        permissions.forEach((permission) =>
            newPermissions.push(permission.attributes.name)
        );
    }
    return { newPermissions, settings, frontSetting, config, allConfigData };
};

export default connect(mapStateToProps, { fetchConfig })(MasterLayout);
