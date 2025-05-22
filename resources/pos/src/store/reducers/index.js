import { combineReducers } from "redux";
import loginReducers from "./authReducer";
import brandsReducers from "./brandsReducers";
import totalRecordReduce from "./totalRecordReduce";
import toastReducer from "./toastReducer";
import currencyReducer from "./currencyReducer";
import productCategoryReducers from "./productCategoryReducers";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";
import warehouseReducer from "./warehouseReducrs";
import unitsReducers from "./unitsReducres";
import supplierReducer from "./supplierReducer";
import customerReducer from "./customerReducer";
import userReducers from "./userReducers";
import expenseCategoryReducer from "./expenseCategoryReducer";
import expenseReducer from "./expenseReducer";
import productReducers from "./productReducers";
import settingReducers from "./settingReducers";
import purchaseProductReducer from "./purchaseProductReducer";
import changePasswordReducers from "./changePasswordReducers";
import posFetchProductReducers from "./pos/posFetchProductReducers";
import posAllProductReducers from "./pos/posAllProductReducres";
import loadingReducer from "./loadingReducer";
import updateProfileReducer from "./updateProfileReducer";
import productUnitReducers from "./productUnitReducers";
import frontSettingReducer from "./frontSettingReducer";
import posCashPaymentReducers from "./pos/posCashPaymentReducers";
import saleReducer from "./saleReducer";
import productSaleUnitReducers from "./productSaleUnitReducers";
import purchaseReducer from "./purchaseReducer";
import transfersReducer from "./transfersReducer";
import changeLanguageReducer from "./changeLanguageReducer";
import updateLanguageReducer from "./updateLanguageReducer";
import dashboardReducers from "./dashboardReducers";
import recentSaleDashboardReducer from "./recentSaleDashboardReducer";
import topSellingProductReducer from "./topSellingProductReducer";
import weekSalePurchaseReducer from "./weekSalePurchaseReducer";
import salesReturnReducer from "./salesReturnReducer";
import yearTopProductReducer from "./yearTopProductReducer";
import topCustomersReducer from "./topCustomersReducer";
import purchaseDetailsReducers from "./purchaseDetailsReducers";
import saleDetailsReducers from "./saleDetailsReducers";
import purchaseReturnReducers from "./purchaseReturnReducers";
import salesReturnDetailsReducer from "./salesReturnDetailsReducer";
import purchaseReturnDetailsReducers from "./purchaseReturnDetailsReducres";
import warehouseReportReducer from "./warehouseReportReducer";
import resetOptionReducer from "./resetOptionReducer";
import dateReducer from "./dateReducres";
import printQuantity from "./printQuantity";
import stockReportReducer from "./stockReportReducres";
import productQuantityReport from "./productQuantityReport";
import topSellingReportReducer from "./topSellingReportReducer";
import stockDetailsSaleTabReducers from "./stockDetailsSaleTabReducers";
import stockDetailsSaleReturnReducers from "./stockDetailsSaleReturnReducers";
import stockDetailsPurchaseReducer from "./stockDetilsPurchaseReducres";
import stockDetailsPurchaseReturnReducer from "./stockDetailsPurchaseReturnReducres";
import stockDetailsWarehouseReducer from "./stockDetailsWarehouseReducres";
import filterDropDownToggleReducer from "./filterDropDownToggleReducer";
import warehouseDisableReducer from "./warehouseDisableReducer";
import stockAlertReducer from "./stockAlertReducer";
import tokenValidationReducer from "./tokenValidationReducer";
import configReducer from "./configReducer";
import warehouseDetailsReducer from "./warehouseDetailsReducer";
import salePaymentReducer from "./salePaymentReducer";
import saleApiReducer from "./saleApiReducer";
import saveButtonReducer from "./saveButtonReducer";
import adjustMentReducer from "./adjustMentReducer";
import adjustMentDetailsReducer from "./adjustMentDetailsReducer";
import allSalePurchaseReducer from "./allSalePurchaseReducer";
import allConfigReducer from "./allConfigReducer";
import transferDetailsReducer from "./transferDetailsReducer";
import countryStateReducer from "./countryStateReducer";
import productUnitIdReducer from "./productUnitIdReducer";
import emailTemplatesReducer from "./emailTemplatesReducer";
import posRegisterDetailsReducer from "./pos/posRegisterDetailsReducer";
import dateFormatReducer from "./dateFormatReducer";
import suppliersReportReducer from "./suppliersReportReducer";
import supplierPurchaseReportReducer from "./supplierPurchaseReportReducer";
import supplierReportWidgetReducer from "./supplierReportWidgetReducer";
import quotationReducer from "./quotationReducer";
import quotationDetailsReducer from "./quotationDetailsReducer";
import updateBrandReducer from "./updateBrandReducer";
import defaultCountryReducer from "./defaultCountryReducer";
import smsApiReducer from "./smsApiReducer";
import mailSettingsReducer from "./mailSettingsReducer";
import bestCustomeReportReducer from "./bestCustomeReportReducer";
import smsTemplatesReducer from "./smsTemplatesReducer";
import profitAndLossReportReducer from "./profitAndLossReportReducer";
import customerReportReducer from "./customerReportReducer";
import customerReportWidgetReducer from "./customerReportWidgetReducer";
import customerPaymentReportReducer from "./customerPaymentReportReducer";
import bookReducer from "../../admin/store/reducers/bookReducer";
import memberReducer from "../../admin/store/reducers/memberReducer";
import authorReducer from "../../admin/store/reducers/authorReducer";
import bookCirculationReducer from "../../admin/store/reducers/bookCirculationReducer";
import genreReducer from "../../admin/store/reducers/genreReducer";
import publisherReducer from "../../admin/store/reducers/publisherReducer";
import bookLanguageReducer from "../../admin/store/reducers/bookLanguageReducer";
import tagReducer from "../../admin/store/reducers/tagReducer";
import membershipPlanReducer from "../../admin/store/reducers/membershipPlanReducer";
import { reducer as formReducer } from "redux-form";
import sortReducer from "../../admin/store/reducers/sortReducer";
import bookSeriesReducer from "../../admin/store/reducers/bookSeriesReducer";
import bookRequestReducer from "../../admin/store/reducers/bookRequestReducer";
import penaltyReducer from "../../admin/store/reducers/penaltyReducer";
import transactionReducer from "../../admin/store/reducers/transactionReducer";
import bookItemReducer from "../../admin/store/reducers/bookItemReducer";
import availableBookLimitReducer from "../../admin/store/reducers/availableBookLimitReducer";
import subscriptionsReducer from "../../admin/store/reducers/subscriptionsReducer";
import memberBookHistoryReducer from "../../admin/store/reducers/memberBookHistoryReducer";
// import localStorageReducer from "../../admin/store/reducers/localStorageReducer";
import importBookReducer from "../../admin/store/reducers/importBookReducer";
import dashBoardReducer from "../../admin/store/reducers/dashBoardReducer";
import homeSettingReducer from "../../admin/store/reducers/homeSettingReducer";
import testimonialReducer from "../../admin/store/reducers/testimonialReducer";
import importBookModalReducer from "../../admin/store/reducers/importBookModalReducer";
import fileReducer from "../../admin/store/reducers/fileReducer";
import exportBook from "../../admin/store/reducers/exportBook";
import cardReducer from "../../admin/store/reducers/cardReducer";
import availableBookReducer from "../../admin/store/reducers/availableBookReducer";
import countryReducer from "../../admin/store/reducers/countryReducer";
import settingReducer from "../../admin/store/reducers/settingReducer";
import progressReducer from "../../admin/store/reducers/progressReducer";
import priceReducer from "../../admin/store/reducers/currencyReducer";
import searchReducer from "../../admin/store/reducers/searchReducer";
import changePasswordModalReducer from "../../admin/store/reducers/changePasswordModalReducer";
import returnDueDateReducer from "../../admin/store/reducers/penaltiesModalReducer";
import localStorageReducer from "../../admin/store/reducers/localStorageReducer";
import appSettingReducer from "../../admin/store/reducers/appSettingReducer";
import modalReducer from "./modalReducer";
import lmsSettings from "../../admin/store/reducers/settingReducer";
import lmsCurrencyReducer from "../../admin/store/reducers/currencyReducer";
import ebookSubscriptionReducer from "../../member/store/reducers/ebookSubscriptionReducer";
import totalEsubAmount from "../../member/store/reducers/totalEsubReducer";

// import defaultCountryReducer from "../reducers/defaultCountryReducer";

import availableBookByBookItemReducer from "../../store/reducers/availableBookByBookItemReducer";
import sanctionLetterReducer from "./sanctionLetterReducer";
import initialValuesReducer from "./initialValuesReducer";
import editSanctionLetterReducer from "./editSanctionLetterReducer";
import sanctionQuotationReducer from "./sanctionQuotationReducer";
import singleSanctionQuotationReducer from "./singleSanctionQuotationReducer";
import quotationToPurchaseReducers from "./quotationToPurchaseReducers";
import singlePurchaseOrderReducer from "./singlePurchaseOrderReducer";
import frontendContactReducer from "../../member/store/reducers/frontendContactReducer";
import siteCounterReducer from "./siteCounterReducer";
import resourcesReducer from "./resourcesReducer";
import resourceCategoryReducer from "./resourceCategoryReducer";

export default combineReducers({
    totalEsubAmount: totalEsubAmount,
    ebookSubscription: ebookSubscriptionReducer,
    lmsCurrencies: lmsCurrencyReducer,
    lmsSettings: lmsSettings,
    profile: localStorageReducer,
    importBook: importBookReducer,
    appSetting: appSettingReducer,
    // adminAuth: authReducer,
    dashBoard: dashBoardReducer,
    homeSettings: homeSettingReducer,
    testimonials: testimonialReducer,
    isChangePasswordModelToggle: changePasswordModalReducer,
    isReturnDueDateModal: returnDueDateReducer,
    isImportBookModal: importBookModalReducer,
    file: fileReducer,
    exportBooks: exportBook,
    searchText: searchReducer,
    isToggle: modalReducer,
    // currency: priceReducer,
    cards: cardReducer,
    availableBooks: availableBookReducer,
    countries: countryReducer,
    defaultCountry: defaultCountryReducer,
    isLoading: progressReducer,
    settings: settingReducer,
    memberBookHistory: memberBookHistoryReducer,
    subscriptions: subscriptionsReducer,
    bookLimit: availableBookLimitReducer,
    bookItems: bookItemReducer,
    penalties: penaltyReducer,
    transactions: transactionReducer,
    adminBookRequests: bookRequestReducer,
    booksSeries: bookSeriesReducer,
    form: formReducer,
    sortObject: sortReducer,
    membershipPlans: membershipPlanReducer,
    tags: tagReducer,
    bookLanguages: bookLanguageReducer,
    publishers: publisherReducer,
    genres: genreReducer,
    booksCirculation: bookCirculationReducer,
    authors: authorReducer,
    members: memberReducer,
    books: bookReducer,

    loginUser: loginReducers,
    brands: brandsReducers,
    totalRecord: totalRecordReduce,
    toasts: toastReducer,
    currencies: currencyReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    warehouses: warehouseReducer,
    productCategories: productCategoryReducers,
    units: unitsReducers,
    suppliers: supplierReducer,
    users: userReducers,
    customers: customerReducer,
    expenseCategories: expenseCategoryReducer,
    expenses: expenseReducer,
    products: productReducers,
    sales: saleReducer,
    productSales: productSaleUnitReducers,
    settings: settingReducers,
    purchaseProducts: purchaseProductReducer,
    purchases: purchaseReducer,
    tansfers: transfersReducer,
    changePasswords: changePasswordReducers,
    posFetchProducts: posFetchProductReducers,
    posAllProducts: posAllProductReducers,
    isLoading: loadingReducer,
    userProfile: updateProfileReducer,
    productUnits: productUnitReducers,
    frontSetting: frontSettingReducer,
    cashPayment: posCashPaymentReducers,
    selectedLanguage: changeLanguageReducer,
    updateLanguage: updateLanguageReducer,
    todayCount: dashboardReducers,
    recentSalesDashboard: recentSaleDashboardReducer,
    topSelling: topSellingProductReducer,
    weekSalePurchase: weekSalePurchaseReducer,
    yearTopProduct: yearTopProductReducer,
    topCustomers: topCustomersReducer,
    purchaseDetails: purchaseDetailsReducers,
    saleDetails: saleDetailsReducers,
    salesReturn: salesReturnReducer,
    purchaseReturn: purchaseReturnReducers,
    saleReturnDetails: salesReturnDetailsReducer,
    purchaseReturnDetails: purchaseReturnDetailsReducers,
    warehouseReportData: warehouseReportReducer,
    resetOption: resetOptionReducer,
    dates: dateReducer,
    printQuantity: printQuantity,
    stockReports: stockReportReducer,
    productQuantityReport: productQuantityReport,
    topSellingReport: topSellingReportReducer,
    stockDetailsSales: stockDetailsSaleTabReducers,
    stockDetailSaleReturn: stockDetailsSaleReturnReducers,
    stockDetailsPurchase: stockDetailsPurchaseReducer,
    stockDetailPurchaseReturn: stockDetailsPurchaseReturnReducer,
    stockWarehouse: stockDetailsWarehouseReducer,
    dropDownToggle: filterDropDownToggleReducer,
    isOptionDisabled: warehouseDisableReducer,
    stockAlertDetails: stockAlertReducer,
    tokenValidate: tokenValidationReducer,
    config: configReducer,
    warehouseDetails: warehouseDetailsReducer,
    allSalePayments: salePaymentReducer,
    isCallSaleApi: saleApiReducer,
    isSaving: saveButtonReducer,
    adjustments: adjustMentReducer,
    allSalePurchase: allSalePurchaseReducer,
    adjustmentsDetails: adjustMentDetailsReducer,
    allConfigData: allConfigReducer,
    countryState: countryStateReducer,
    productUnitId: productUnitIdReducer,
    emailTemplates: emailTemplatesReducer,
    posAllTodaySaleOverAllReport: posRegisterDetailsReducer,
    dateFormat: dateFormatReducer,
    allSupplierReport: suppliersReportReducer,
    supplierPurchaseReport: supplierPurchaseReportReducer,
    supplierReportWidgetData: supplierReportWidgetReducer,
    quotations: quotationReducer,
    quotationDetails: quotationDetailsReducer,
    isCallBrandApi: updateBrandReducer,
    mailSettingsData: mailSettingsReducer,
    smsTemplates: smsTemplatesReducer,
    bestCustomer: bestCustomeReportReducer,
    profitAndLossReport: profitAndLossReportReducer,
    allCustomerReport: customerReportReducer,
    customerReportWidgetData: customerReportWidgetReducer,
    customerPayment: customerPaymentReportReducer,
    transferDetails: transferDetailsReducer,
    defaultCountry: defaultCountryReducer,
    smsApiData: smsApiReducer,
    availableBookByBookItem: availableBookByBookItemReducer,
    sanctionLetters: sanctionLetterReducer,
    initialValues: initialValuesReducer,
    editSanctionLetter: editSanctionLetterReducer,
    sanctionQuotation: sanctionQuotationReducer,
    singleSanctionQuotation: singleSanctionQuotationReducer,
    quotationPurchase: quotationToPurchaseReducers,
    singlePurchaseOrder: singlePurchaseOrderReducer,
    frontendContact: frontendContactReducer,
    siteCounter: siteCounterReducer,
    resources: resourcesReducer,
    resourceCategory: resourceCategoryReducer,
});
