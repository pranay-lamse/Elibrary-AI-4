import React from "react";
import { Permissions } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPieChart,
    faUser,
    faTruck,
    faUserGroup,
    faHome,
    faBoxes,
    faPrint,
    faBookmark,
    faBoxOpen,
    faMoneyCheckDollar,
    faMoneyBills,
    faQuoteRight,
    faDollarSign,
    faReceipt,
    faArrowRight,
    faArrowLeft,
    faEnvelope,
    faCartShopping,
    faChartColumn,
    faGear,
    faMapLocation,
    faBasketShopping,
    faSms,
    faCube,
    faFile,
    faBook,
    faBookReader,
    faUserFriends,
    faLayerGroup,
    faAtlas,
    faGlobe,
    faTags,
    faHandPaper,
    faSwatchbook,
    faRupee,
    faCogs,
    faCog,
    faFrog,
    faTruckFast,
    faBoxTissue,
    faWindowRestore,
    faSquareCaretRight,
    faMailBulk,
    faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "../shared/sharedMethod";
import { ShieldLock } from "react-bootstrap-icons";

export default [
    {
        title: "erp.title",
        name: "ERP",
        fontIcon: <FontAwesomeIcon icon={faFrog} />,
        to: "/admin/pos/sales",
        class: "d-flex",
        is_submenu: "true",
        permission: "",
        subPath: {
            SubPath: "/admin/pos/pos-dashboard",
            productsSubPath: "/admin/pos/products",
            adjustmentsSubPath: "/admin/pos/adjustments",
            quotationsSubPath: "/admin/pos/quotations",
            purchasesSubPath: "/admin/pos/purchases",
            salesSubPath: "/admin/pos/sales",
            transfersSubPath: "/admin/pos/transfers",
            expensesSubPath: "/admin/pos/expenses",
            expensesSubPath: "/admin/pos/expenses",
            suppliersSubPath: "/admin/pos/suppliers",
            rolesSubPath: "/admin/pos/roles",
            warehouseSubPath: "/admin/pos/warehouse",
            reportSubPath: "/admin/pos/report",
            currenciesSubPath: "/admin/pos/currencies",
            emailTemplatesSubPath: "/admin/pos/email-templates",
            lmposSettingsSubPath: "/admin/pos/lmpos-settings",
        },
        subMenu: [
            {
                title: "POSdashboard.title",
                name: "dashboard",
                fontIcon: <FontAwesomeIcon icon={faPieChart} />,
                to: "/admin/pos/pos-dashboard",
                class: "d-flex",
                permission: "",
                items: [
                    {
                        title: getFormattedMessage("POSdashboard.title"),
                        to: "/admin/pos/pos-dashboard",
                    },
                ],
            },

            {
                title: "Financials",
                name: "Financials",
                fontIcon: <FontAwesomeIcon icon={faMoneyBills} />,
                to: "/admin/pos/expenses",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_EXPENSES,
                subPath: {
                    expensesSubPath: "/admin/pos/expenses",
                    expenseCategoriesSubPath: "/admin/pos/expense-categories",
                },
                subMenu: [
                    {
                        title: "Income",
                        name: "Income",
                        fontIcon: <FontAwesomeIcon icon={faMoneyBills} />,
                        to: "/admin/pos/income",
                        class: "d-flex",
                        permission: Permissions.MANAGE_EXPENSES,
                    },
                    {
                        title: "expenses.title",
                        name: "expenses",
                        fontIcon: <FontAwesomeIcon icon={faMoneyBills} />,
                        to: "/admin/pos/expenses",
                        class: "d-flex",
                        permission: Permissions.MANAGE_EXPENSES,
                    },
                    {
                        title: "Categories",
                        name: "Categories",
                        fontIcon: <FontAwesomeIcon icon={faMoneyCheckDollar} />,
                        class: "d-flex",
                        permission: Permissions.MANAGE_EXPENSES_CATEGORIES,
                        to: "/admin/pos/expense-categories",
                    },
                ],
            },

            {
                title: "Assets",
                name: "Assets",
                fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                to: "/admin/pos/products",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_PRODUCTS,
                subPath: {
                    productsSubPath: "/admin/pos/products",
                    categoriesSubPath: "/admin/pos/product-categories",
                    brandsSubPath: "/admin/pos/brands",
                    unitsSubPath: "/admin/pos/units",
                    barcodeSubPath: "/admin/pos/print/barcode",
                },
                subMenu: [
                    {
                        title: "Assets",
                        to: "/admin/pos/products",
                        name: "Assets",
                        class: "d-flex",
                        fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                        permission: Permissions.MANAGE_PRODUCTS,
                    },
                    {
                        title: "Categories",
                        name: "Categories",
                        fontIcon: <FontAwesomeIcon icon={faBoxOpen} />,
                        to: "/admin/pos/product-categories",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PRODUCT_CATEGORIES,
                    },
                    {
                        title: "brands.title",
                        name: "brands",
                        fontIcon: <FontAwesomeIcon icon={faBookmark} />,
                        to: "/admin/pos/brands",
                        path: "/admin/pos/create-brand",
                        class: "d-flex",
                        permission: Permissions.MANAGE_BRANDS,
                    },
                    {
                        title: "units.title",
                        name: "units",
                        fontIcon: <FontAwesomeIcon icon={faQuoteRight} />,
                        to: "/admin/pos/units",
                        class: "d-flex",
                        permission: Permissions.MANAGE_UNITS,
                    },
                    {
                        title: "print.barcode.title",
                        name: "print barcode",
                        fontIcon: <FontAwesomeIcon icon={faPrint} />,
                        to: "/admin/pos/print/barcode",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PRODUCTS,
                    },
                ],
            },

            /* new

            */

            {
                title: "Purchases",
                name: "Purchases",
                fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                to: "/admin/pos/sanction-letters",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_PURCHASE,
                subPath: {
                    purchasesSubPath: "/admin/pos/sanction-letters",
                    purchaseQuotationSubPath: "/admin/pos/quotations",
                    purchasePurchasesSubPath: "/admin/pos/purchases",
                    purchasePurchaseReturnSubPath: "/admin/pos/purchase-return",
                    purchaseAdjusmentSubPath: "/admin/pos/adjustments",
                },
                subMenu: [
                    {
                        title: "Raise Requests",
                        name: "Raise Requests",
                        fontIcon: <FontAwesomeIcon icon={faMailBulk} />,
                        to: "/admin/pos/sanction-letters",
                        class: "d-flex",
                        permission: Permissions.MANAGE_SANCTION_LETTERS,
                        items: [
                            {
                                title: getFormattedMessage(
                                    "sanction.letter.request"
                                ),
                                to: "/admin/pos/sanction-letters",
                            },
                        ],
                    },
                    {
                        title: "quotations.title",
                        name: "quotations.title",
                        fontIcon: <FontAwesomeIcon icon={faBasketShopping} />,
                        to: "/admin/pos/quotations",
                        class: "d-flex",
                        permission: Permissions.MANAGE_QUOTATION,
                        items: [
                            {
                                title: getFormattedMessage("quotations.title"),
                                to: "/admin/pos/quotations",
                            },
                        ],
                    },
                    {
                        title: "purchases.title",
                        name: "purchases",
                        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                        to: "/admin/pos/purchases",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PURCHASE,
                    },
                    {
                        title: "purchases.return.title",
                        name: "purchases return",
                        fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                        to: "/admin/pos/purchase-return",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PURCHASE_RETURN,
                    },
                    {
                        title: "adjustments.title",
                        name: "adjustments",
                        fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                        to: "/admin/pos/adjustments",
                        class: "d-flex",
                        permission: Permissions.MANAGE_ADJUSTMENTS,
                        items: [
                            {
                                title: getFormattedMessage("adjustments.title"),
                                to: "/admin/pos/adjustments",
                            },
                        ],
                    },
                ],
            },

            ,
            /* new end  */

            /*  {
                title: "purchases.title",
                name: "purchases",
                fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                to: "/admin/pos/purchases",
                class: "d-flex",
                is_submenu: "true",
                permission: Permissions.MANAGE_PURCHASE,
                subPath: {
                    purchasesSubPath: "/admin/pos/purchases",
                    purchaseReturnSubPath: "/admin/pos/purchase-return",
                },
                subMenu: [
                    {
                        title: "purchases.title",
                        name: "purchases",
                        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                        to: "/admin/pos/purchases",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PURCHASE,
                    },
                    {
                        title: "purchases.return.title",
                        name: "purchases return",
                        fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                        to: "/admin/pos/purchase-return",
                        class: "d-flex",
                        permission: Permissions.MANAGE_PURCHASE_RETURN,
                    },
                    {
                        title: "adjustments.title",
                        name: "adjustments",
                        fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                        to: "/admin/pos/adjustments",
                        class: "d-flex",
                        permission: Permissions.MANAGE_ADJUSTMENTS,
                        items: [
                            {
                                title: getFormattedMessage("adjustments.title"),
                                to: "/admin/pos/adjustments",
                            },
                        ],
                    },
                ],
            }, */
            // {
            //     title: "sales.title",
            //     name: "sales",
            //     fontIcon: <FontAwesomeIcon icon={faCartShopping} />,
            //     to: "/admin/pos/sales",
            //     class: "d-flex",
            //     is_submenu: "true",
            //     permission: Permissions.MANAGE_SALE,
            //     subPath: {
            //         salesSubPath: "/admin/pos/sales",
            //         salesReturnSubPath: "/admin/pos/sale-return",
            //     },
            //     subMenu: [
            //         {
            //             title: "sales.title",
            //             name: "sales",
            //             fontIcon: <FontAwesomeIcon icon={faCartShopping} />,
            //             to: "/admin/pos/sales",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SALE,
            //         },
            //         {
            //             title: "sales-return.title",
            //             name: "sales return",
            //             fontIcon: <FontAwesomeIcon icon={faArrowRight} />,
            //             to: "/admin/pos/sale-return",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SALE_RETURN,
            //         },
            //     ],
            // },

            {
                title: "Admin",
                name: "Admin",
                fontIcon: <FontAwesomeIcon icon={faUser} />,
                to: "/admin/pos/suppliers",
                class: "d-flex",
                is_submenu: "true",
                subPath: {
                    customerSubPath: "/admin/pos/customers",
                    userSubPath: "/admin/pos/users",
                    userRoleSubPath: "/admin/pos/roles",
                    suppliareSubPath: "/admin/pos/suppliers",
                    LibrarySubPath: "/admin/pos/library",
                },
                permission: Permissions.MANAGE_SUPPLIERS,
                subMenu: [
                    {
                        title: "suppliers.title",
                        name: "suppliers",
                        fontIcon: <FontAwesomeIcon icon={faTruck} />,
                        to: "/admin/pos/suppliers",
                        class: "d-flex",
                        permission: Permissions.MANAGE_SUPPLIERS,
                    },
                    {
                        title: "users.title",
                        name: "users",
                        fontIcon: <FontAwesomeIcon icon={faUser} />,
                        to: "/admin/pos/users",
                        class: "d-flex",
                        permission: Permissions.MANAGE_USER,
                    },
                    {
                        title: "Role / Permissions",
                        name: "roles",
                        fontIcon: <ShieldLock />,
                        to: "/admin/pos/roles",
                        class: "d-flex",
                        permission: Permissions.MANAGE_ROLES,
                        items: [
                            {
                                title: getFormattedMessage("roles.title"),
                                to: "/admin/pos/roles",
                            },
                        ],
                    },

                    {
                        title: "Libraries",
                        name: "Libraries",
                        fontIcon: <FontAwesomeIcon icon={faHome} />,
                        to: "/admin/pos/library",
                        class: "d-flex",
                        permission: Permissions.MANAGE_WAREHOUSES,
                        items: [
                            {
                                title: getFormattedMessage("library.title"),
                                to: "/admin/pos/warehouse",
                            },
                        ],
                    },
                    {
                        title: "customers.title",
                        name: "customers",
                        fontIcon: <FontAwesomeIcon icon={faUserGroup} />,
                        to: "/admin/pos/customers",
                        class: "d-flex",
                        permission: Permissions.MANAGE_CUSTOMERS,
                    },
                ],
            },

            {
                title: "reports.title",
                name: "reports",
                fontIcon: <FontAwesomeIcon icon={faChartColumn} />,
                to: "/admin/pos/report/report-library",
                path: "/admin/pos/report/report-sale",
                stockPath: "/admin/pos/report/report-stock",
                purchasePath: "/admin/pos/report/report-purchase",
                topSellingPath: "/admin/pos/report/report-top-selling-products",
                stockDetailPath: "/admin/pos/report/report-detail-stock",
                productQuantityAlertPath:
                    "/admin/pos/report/report-product-quantity",
                supplierReportPath: "/admin/pos/report/suppliers",
                profitLossReportPath: "/admin/pos/report/profit-loss",
                supplierReportDetailsPath:
                    "/admin/pos/report/suppliers/details",
                bestCustomerReportPath: "/admin/pos/report/best-customers",
                customerReportPath: "/admin/pos/report/customers",
                customerReportDetailsPath:
                    "/admin/pos/report/customers/details",
                class: "d-flex",
                isSamePrefix: "true",
                permission: Permissions.MANAGE_REPORTS,
                subTitles: [
                    { title: "warehouse.reports.title" },
                    { title: "sale.reports.title" },
                    { title: "stock.reports.title" },
                    { title: "purchase.reports.title" },
                    { title: "top-selling-product.reports.title" },
                    { title: "product.quantity.alert.reports.title" },
                    { title: "supplier.report.title" },
                    { title: "best-customer.report.title" },
                    { title: "customer.report.title" },
                    { title: "customer.report.title" },
                    { title: "profit-loss.reports.title" },
                    { title: "best-customer.report.title" },
                ],
                items: [
                    {
                        title: getFormattedMessage("warehouse.reports.title"),
                        to: "/admin/pos/report/report-warehouse",
                    },
                    {
                        title: getFormattedMessage("sale.reports.title"),
                        to: "/admin/pos/report/report-sale",
                    },
                    {
                        title: getFormattedMessage("stock.reports.title"),
                        to: "/admin/pos/report/report-stock",
                        detail: "/admin/pos/report/report-detail-stock",
                    },
                    {
                        title: getFormattedMessage("purchase.reports.title"),
                        to: "/admin/pos/report/report-purchase",
                    },
                    {
                        title: getFormattedMessage(
                            "top-selling-product.reports.title"
                        ),
                        to: "/admin/pos/report/report-top-selling-products",
                    },
                    {
                        title: getFormattedMessage(
                            "product.quantity.alert.reports.title"
                        ),
                        to: "/admin/pos/report/report-product-quantity",
                    },
                    // {
                    //     title: "Supplier Report",
                    //     to: '/admin/pos/report/suppliers',
                    // },
                    {
                        title: getFormattedMessage("supplier.report.title"),
                        to: "/admin/pos/report/suppliers",
                        detail: "/admin/pos/report/suppliers/details",
                    },
                    {
                        title: getFormattedMessage("profit-loss.reports.title"),
                        to: "/admin/pos/report/profit-loss",
                    },
                    {
                        title: getFormattedMessage(
                            "best-customer.report.title"
                        ),
                        to: "/admin/pos/report/best-customers",
                    },
                    {
                        title: getFormattedMessage("customer.report.title"),
                        to: "/admin/pos/report/customers",
                        detail: "/admin/pos/report/customers/details",
                    },
                ],
            },
            // {
            //     title: "currencies.title",
            //     name: "currencies",
            //     fontIcon: <FontAwesomeIcon icon={faDollarSign} />,
            //     to: "/admin/pos/currencies",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_CURRENCY,
            //     items: [
            //         {
            //             title: getFormattedMessage("currencies.title"),
            //             to: "/admin/pos/currencies",
            //         },
            //     ],
            // },

            // {
            //     title: "invoices.title",
            //     name: "invoices",
            //     fontIcon: <FontAwesomeIcon icon={faFileInvoice} />,
            //     to: "/admin/pos/invoices",
            //     class: "d-flex",
            //     permission: "",
            //     items: [
            //         {
            //             title: getFormattedMessage("invoices.title"),
            //             to: "/admin/pos/invoices",
            //         },
            //     ],
            // },
            // {
            //     title: "sanction.letter.request",
            //     name: "sanctionLetter",
            //     fontIcon: <FontAwesomeIcon icon={faMailBulk} />,
            //     to: "/admin/pos/sanction-letters",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_SANCTION_LETTERS,
            //     items: [
            //         {
            //             title: getFormattedMessage("sanction.letter.request"),
            //             to: "/admin/pos/sanction-letters",
            //         },
            //     ],
            // },
            // {
            //     title: "template.title",
            //     name: "template",
            //     fontIcon: <FontAwesomeIcon icon={faFile} />,
            //     to: "/admin/pos/email-templates",
            //     class: "d-flex",
            //     is_submenu: "true",
            //     permission: Permissions.MANAGE_EMAIL_TEMPLATES,
            //     subPath: {
            //         emailTemplateSubPath: "/admin/pos/email-templates",
            //         smsTemplateSubPath: "/admin/pos/sms-templates",
            //         smsApiSubPath: "/admin/pos/sms-api",
            //     },
            //     subMenu: [
            //         {
            //             title: "email-template.title",
            //             name: "email-templates",
            //             fontIcon: <FontAwesomeIcon icon={faEnvelope} />,
            //             to: "/admin/pos/email-templates",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_EMAIL_TEMPLATES,
            //         },
            //         {
            //             title: "sms-template.title",
            //             name: "sms-templates",
            //             fontIcon: <FontAwesomeIcon icon={faSms} />,
            //             to: "/admin/pos/sms-templates",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SMS_TEMPLATES,
            //         },
            //         {
            //             title: "sms-api.title",
            //             name: "sms-api",
            //             fontIcon: <FontAwesomeIcon icon={faCube} />,
            //             to: "/admin/pos/sms-api",
            //             class: "d-flex",
            //             permission: Permissions.MANAGE_SMS_API,
            //         },
            //     ],
            // },
            {
                to: "/admin/pos/pos",
                class: "d-none",
                name: "pos",
                title: "header.pos.title",
                permission: Permissions.MANAGE_POS_SCREEN,
            },
            // {
            //     title: "settings.title",
            //     name: "settings",
            //     fontIcon: <FontAwesomeIcon icon={faGear} />,
            //     to: "/admin/pos/lmpos-settings",
            //     prefixesPath: "/admin/pos/prefixes",
            //     mailSettingsPath: "/admin/pos/mail-settings",
            //     class: "d-flex",
            //     isSamePrefix: "true",
            //     permission: Permissions.MANAGE_SETTING,
            //     subTitles: [
            //         { title: "prefix.title" },
            //         { title: "mail-settings.title" },
            //     ],
            //     items: [
            //         {
            //             title: getFormattedMessage("settings.title"),
            //             to: "/admin/pos/lmpos-settings",
            //         },
            //         {
            //             title: getFormattedMessage("prefix.title"),
            //             to: "/admin/pos/prefixes",
            //         },
            //         {
            //             title: getFormattedMessage("mail-settings.title"),
            //             to: "/admin/pos/mail-settings",
            //         },
            //     ],
            // },
            // {
            //     title: "book.request.letter.title",
            //     name: "bookRequestLetter",
            //     fontIcon: <FontAwesomeIcon icon={faEnvelope} />,
            //     to: "/admin/pos/request-letters",
            //     class: "d-flex",
            //     permission: Permissions.BOOK_REQUEST_LETTER,
            //     items: [
            //         {
            //             title: getFormattedMessage("book.request.letter.title"),
            //             to: "/admin/pos/request-letters",
            //         },
            //     ],
            // },
        ],
    },
];
