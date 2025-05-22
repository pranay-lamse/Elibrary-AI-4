import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import progressReduce from "../../../admin/store/reducers/progressReducer";
import searchReducer from "../../../admin/store/reducers/searchReducer";
import sortReducer from "../../../store/reducers/sortReducer";
import toastReducer from "../../../store/reducers/toastReducer";
import modalReducer from "../../../store/reducers/modalReducer";
import memberReducer from "./memberReducer";
import membershipPlanReducer from "./membershipPlanReducer";
import countryReducer from "./countryReducer";
import bookHistoryReducer from "./bookHistoryReducer";
import bookReducer from "./bookReducer";
import ebookReducer from "./ebookReducer";
import bookSearchReducer from "./bookSearchReducer";
import authorReducer from "./authorReducer";
import localStorageReducer from "../../../store/reducers/localStorageReducer";
import appSettingReducer from "../../../store/reducers/appSettingReducer";
import settingReducer from "./settingReducer";
import authReducer from "./authReducer";
import bookRequestReducer from "./bookRequestReducer";
import genreReducer from "./genreReducer";
import cardReducer from "./cardReducer";
import totalBookReducer from "./totalBookReducer";
import totalRecordReduce from "./totalRecordReduce";
import homeSettingReducer from "./homeSettingReducer";
import testimonialReducer from "./testimonialReducer";
import changePasswordModalReducer from "../../../admin/store/reducers/changePasswordModalReducer";
import changeLanguageModalReducer from "../../../store/reducers/changeLanguageModalReducer";
import sidebarReducers from "./sidebarReducer";
import membershipPaymentReducer from "./membershipPaymentReducer";
import transactionsReducer from "./transactionsReducer";
import allSettingsReducer from "./allSettingsReducer";
import currentPlanReducer from "./currentPlanReducer";
import ebookSubscriptionReducer from "./ebookSubscriptionReducer";
import totalEsubReducer from "./totalEsubReducer";
import frontendContactReducer from "./frontendContactReducer";
import publisherReducer from "../../../admin/store/reducers/publisherReducer";
import bookLanguageReducer from "../../../admin/store/reducers/bookLanguageReducer";
import subscriptionLimitReducer from "./subscriptionLimitReducer";
import isMemberRegisteredReducer from "./isMemberRegisteredReducer";
import newBookSearchReducer from "./newBookSearchReducer";
import siteCounterReducer from "../../../store/reducers/siteCounterReducer";
import resourcesReducer from "../../../store/reducers/resourcesReducer";
import resourceCategoryReducer from "../../../store/reducers/resourceCategoryReducer";
import bookSeriesReducer from "../../../admin/store/reducers/bookSeriesReducer";

export default combineReducers({
    totalEsubAmount: totalEsubReducer,
    ebookSubscription: ebookSubscriptionReducer,
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    member: memberReducer,
    membershipPlans: membershipPlanReducer,
    countries: countryReducer,
    bookHistory: bookHistoryReducer,
    books: bookReducer,
    genres: genreReducer,
    aboutUsCard: cardReducer,
    ebooks: ebookReducer,
    totalBooks: totalBookReducer,
    searchBooks: bookSearchReducer,
    authors: authorReducer,
    profile: localStorageReducer,
    appSetting: appSettingReducer,
    settings: settingReducer,
    auth: authReducer,
    bookRequests: bookRequestReducer,
    totalRecordMember: totalRecordReduce,
    homeSettings: homeSettingReducer,
    testimonials: testimonialReducer,
    isChangePasswordModelToggle: changePasswordModalReducer,
    isChangeLanguageModelToggle: changeLanguageModalReducer,
    sidebarReducer: sidebarReducers,
    paymentSessionId: membershipPaymentReducer,
    transactions: transactionsReducer,
    allSettings: allSettingsReducer,
    currentPlanDetails: currentPlanReducer,
    frontendContact: frontendContactReducer,
    publishers: publisherReducer,
    bookLanguage: bookLanguageReducer,
    subscriptionLimit: subscriptionLimitReducer,
    isMemberRegistered: isMemberRegisteredReducer,
    newBookSearch: newBookSearchReducer,
    siteCounter: siteCounterReducer,
    resources: resourcesReducer,
    resourceCategory: resourceCategoryReducer,
    booksSeries: bookSeriesReducer,
});

