export const loggedConstant = {
    IS_USER_LOGOUT: "isUserLogout",
    IS_MEMBER_LOGOUT: "isMemberLogout",
};

export const apiBaseURL = {
    EBOOK_SUBSCRIPTION: "ebook-subscription",
    AUTHOR: "authors",
    BOOK_LANGUAGE: "book-languages",
    BOOK_REQUEST: "book-requests",
    E_BOOK: "e-books",
    BOOK: "books",
    BOOK_DETAILS: "get-book-details",
    BOOK_LIMIT: "books",
    BOOK_HISTORY: "books-history",
    BOOK_ITEM: "book-items",
    BOOK_SERIES: "book-series",
    TOTAL_BOOKS: "total-books",
    CURRENCY: "currencies",
    CONFIG: "config",
    COUNTRY: "countries",
    DASHBOARD_DETAILS: "dashboard-details",
    GENRE: "genres",
    ABOUT_US_CARD: "about-us-cards",
    PENALTY: "penalties",
    ISSUED_BOOK: "issued-books",
    ADMIN_FORGOT_PASSWORD: "send-reset-password-link",
    ADMIN_RESET_PASSWORD: "reset-password",
    MEMBER_FORGOT_PASSWORD: "send-reset-member-password-link",
    MEMBER_RESET_PASSWORD: "reset-member-password",
    MEMBER: "members",
    MEMBER_LOGIN: "member-login",
    MEMBER_REGISTRATION: "/v1/register-member",
    MEMBER_PLAN: "membership-plans",
    PERMISSION: "permissions",
    PUBLISHER: "publishers",
    ROLE: "roles",
    SETTING: "settings",
    HOME_SETTING: "homepage-settings",
    SEARCH_BOOK: "search-books",
    TAG: "tags",
    UPLOAD_LOGO: "upload-logo",
    UPLOAD_FAVICON: "upload-favicon",
    USER: "users",
    SUBSCRIPTION: "get-subscriptions",
    CASH_PAYMENTS: "offline-subscriptions",
    UPDATE_SUBS_STATUS: "offline-subscription-status",
    UPDATE_SUBSCRIPTION: "subscriptions",
    TESTIMONIAL: "testimonials",
    USER_LOGIN: "login",
    USER_DETAILS: "user-details",
    USER_PROFILE_UPDATE: "update-user-profile",
    CHANGE_PASSWORD: "change-password",
    MY_SETTINGS: "my-settings",
    UPDATE_SETTINGS: "update-settings",
    BOOKS_EXPORT: "books-export",
    BOOKS_IMPORT: "books-import",
    EXPORT_BOOKS_CIRCULATION: "export-books-circulation",
    CREATE_MEMBERSHIP_PAYMENT_SESSION: "create-membership-payment-session",
    MEMBER_TRANSACTIONS: "get-member-transactions",
    ALL_SETTINGS: "all-settings",
    CREATE_OFFLINE_PAYMENT: "create-offline-subscription",
};

export const toastType = {
    ERROR: "error",
};

export const memberActionType = {
    FETCH_MEMBER: "FETCH_MEMBER",
    EDIT_MEMBER: "EDIT_MEMBER",
};

export const currentMembershipDetails = {
    FETCH_CURRENT_MEMBERSHIPDETAILS: "FETCH_CURRENT_MEMBERSHIPDETAILS",
    // EDIT_MEMBER: 'EDIT_MEMBER',
};

export const membershipPlanActionType = {
    FETCH_MEMBERSHIP_PLANS: "FETCH_MEMBERSHIP_PLANS",
    FETCH_SESSION_ID: "FETCH_SESSION_ID",
};

export const countryActionType = {
    FETCH_COUNTRIES: "FETCH_COUNTRIES",
};

export const bookCirculationStatusConstant = {
    BOOK_RESERVED: 1,
    BOOK_ISSUED: 2,
    BOOK_RETURNED: 3,
    BOOK_AVAILABLE: 4,
    BOOK_UN_RESERVED: 5,
    BOOK_LOST: 6,
    BOOK_DAMAGED: 7,
    BOOK_REISSUE: 8,
};

export const bookHistoryActionType = {
    FETCH_MEMBER_BOOK_HISTORY: "FETCH_MEMBER_BOOK_HISTORY",
    BOOK_UN_RESERVED: "BOOK_UN_RESERVED",
};

export const bookActionType = {
    FETCH_GENRES: "FETCH_GENRES",
    FETCH_BOOKS: "FETCH_BOOKS",
    FETCH_TOTAL_BOOKS: "FETCH_TOTAL_BOOKS",
    FETCH_FEATURED_BOOKS: "FETCH_FEATURED_BOOKS",
    FETCH_FEATURED_GENRES: "FETCH_FEATURED_GENRES",
    FETCH_FEATURED_CARDS: "FETCH_FEATURED_CARDS",
    SEARCH_BOOKS: "SEARCH_BOOKS",
    RESERVE_BOOK: "RESERVE_BOOK",
    RESET_SEARCH_BOOKS: "RESET_SEARCH_BOOKS",
};

export const eBookActionType = {
    FETCH_E_BOOKS: "FETCH_E_BOOKS",
};

export const authorActionType = {
    FETCH_AUTHORS: "FETCH_AUTHORS",
};

export const bookStatusOptions = [
    { id: 1, name: "Reserved" },
    { id: 2, name: "Issued" },
    { id: 3, name: "Returned" },
    { id: 4, name: "Available" },
    { id: 5, name: "Unreserved" },
];

export const bookStatusConstant = {
    STATUS_NOT_AVAILABLE: 0,
    STATUS_AVAILABLE: 1,
};

export const bookItemStatusConstants = {
    AVAILABLE: 1,
    UNAVAILABLE: 2,
    LOST: 3,
    DAMAGE: 4,
};

export const settingActionType = {
    FETCH_SETTING: "FETCH_SETTING",
    POST_SETTINGS: "POST_SETTINGS",
    FETCH_ALL_SETTINGS: "FETCH_ALL_SETTINGS",
};

export const settingsKey = {
    LANGUAGE: "current_language",
    DEFAULT_LOCALE: "en",
    LOCALE_ARABIC: "en",
    LOCALE_SPANISH: "sp",
};

export const authActionType = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    RESET_PASSWORD: "RESET_PASSWORD",
    REGISTRATION: "REGISTRATION",
};

export const bookRequestActionType = {
    FETCH_ADMIN_BOOKS_REQUEST: "FETCH_ADMIN_BOOKS_REQUEST",
    FETCH_ADMIN_BOOK_REQUEST: "FETCH_ADMIN_BOOK_REQUEST",
    ADD_ADMIN_BOOK_REQUEST: "ADD_ADMIN_BOOK_REQUEST",
    EDIT_ADMIN_BOOK_REQUEST: "EDIT_ADMIN_BOOK_REQUEST",
    DELETE_ADMIN_BOOK_REQUEST: "DELETE_ADMIN_BOOK_REQUEST",
    FETCH_EBOOK_SUBSCRIPTION: "FETCH_EBOOK_SUBSCRIPTION",
};

export const transactionsActionType = {
    FETCH_MEMBER_TRANSACTIONS: "FETCH_MEMBER_TRANSACTIONS",
};

export const membershipPlanFrequencyOptions = [
    { id: 1, name: "membership-plan.monthly.title" },
    { id: 2, name: "membership-plan.yearly.title" },
];

export const constants = {
    SET_TOTAL_RECORD: "SET_TOTAL_RECORD",
    SET: "SET",
};

export const languageOptions = [
    {
        id: "ar",
        name: "member.select.language.arabic.label",
        display_name: "Arabic",
    },
    {
        id: "cn",
        name: "member.select.language.chinese.label",
        display_name: "Chinese",
    },
    {
        id: "en",
        name: "member.select.language.english.label",
        display_name: "English",
    },
    {
        id: "fr",
        name: "member.select.language.french.label",
        display_name: "French",
    },
    {
        id: "gr",
        name: "member.select.language.german.label",
        display_name: "German",
    },
    {
        id: "it",
        name: "member.select.language.italian.label",
        display_name: "Italian",
    },
    {
        id: "pe",
        name: "member.select.language.persian.label",
        display_name: "Persian",
    },
    {
        id: "po",
        name: "member.select.language.portuguese.label",
        display_name: "Portuguese",
    },
    {
        id: "ru",
        name: "member.select.language.russian.label",
        display_name: "Russian",
    },
    {
        id: "sp",
        name: "member.select.language.spanish.label",
        display_name: "Spanish",
    },
    {
        id: "tr",
        name: "member.select.language.turkish.label",
        display_name: "Turkish",
    },
];

export const Routes = {
    APP_HOME: "/",
    MEMBER_HOME: "/lms/landing",
    MEMBER_LENDING: "/lms/landing",
    MEMBER_LOGIN: "/lms/login",
    MEMBER_REGISTRATION: "/lms/registration",
    MEMBER_DEFAULT: "/lms/books",
    ADMIN_LOGIN: "/lms/login",
    ADMIN_DEFAULT: "/lms/dashboard",
    BOOKS: "/lms/books/",
    MEMBERS: "/lms/members/",
    BOOKS_CIRCULATION: "/lms/books-circulation/",
    USERS: "/lms/users/",
    MEMBER_FORGOT_PASSWORD: "/lms/forgot-password",
    MEMBER_RESET_PASSWORD: "/lms/reset-password",
    ADMIN_FORGOT_PASSWORD: "/lms/forgot-password",
    ADMIN_RESET_PASSWORD: "/lms/reset-password",
    USER_PROFILE: "/lms/user-profile",
    MEMBER_PROFILE: "/lms/member-profile",
    MEMBER_PLAN: "/lms/member-plan",
    MEMBER_PLAN_OTHER_LIBRARY: "/lms/member-plan-other-library",
    MEMBER_PLAN_METHOD: "/lms/member-plan/method/:id",
    TRANSACTION: "/lms/transaction",
    CURRENT_PLAN: "/lms/current-plan",
};

export const appSettingsKey = {
    LIBRARY_NAME: "library_name",
    LIBRARY_LOGO: "library_logo",
};

export const LocalStorageKey = {
    USER: "user",
    MEMBER: "member",
};

export const Tokens = {
    ADMIN: "auth_token",
    USER: "user",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    IMAGE: "image",
    REGISTER_USER: "register_user",
    GET_PERMISSIONS: "get_permissions",
    USER_IMAGE_URL: "user_image_url",
    UPDATED_EMAIL: "updated_email",
    UPDATED_FIRST_NAME: "updated_first_name",
    UPDATED_LAST_NAME: "updated_last_name",
    LANGUAGE: "language",
    UPDATED_LANGUAGE: "updated_language",

    /* ADMIN: 'authtoken', */
    MEMBER: "memberToken",
};
