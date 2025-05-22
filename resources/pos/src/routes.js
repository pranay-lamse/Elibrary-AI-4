import POSDashboard from "./components/pos-dashboard/Dashboard";
import Brands from "./components/brands/Brands";
import Currencies from "./components/currency/Currencies";
import Warehouses from "./components/warehouse/Warehouses";
import CreateWarehouse from "./components/warehouse/CreateWarehouse";
import EditWarehouse from "./components/warehouse/EditWarehouse";
import ProductCategory from "./components/productCategory/ProductCategory";
import Units from "./components/units/Units";
import Suppliers from "./components/supplier/Suppliers";
import CreateSupplier from "./components/supplier/CreateSupplier";
import EditSupplier from "./components/supplier/EditSupplier";
import Customers from "./components/customer/Customers";
import CreateCustomer from "./components/customer/CreateCustomer";
import EditCustomer from "./components/customer/EditCustomer";
import User from "./components/users/User";
import CreateUser from "./components/users/CreateUser";
import EditUser from "./components/users/EditUser";
import UserDetail from "./components/users/UserDetail";
import UpdateProfile from "./components/user-profile/UpdateProfile";
import Product from "./components/product/Product";
import CreateProduct from "./components/product/CreateProduct";
import EditProduct from "./components/product/EditProduct";
import ProductDetail from "./components/product/ProductDetail";
import Settings from "./components/settings/Settings";
import ExpenseCategory from "./components/expense-category/ExpenseCategory";
import Expenses from "./components/expense/Expenses";
import CreateExpense from "./components/expense/CreateExpense";
import EditExpense from "./components/expense/EditExpense";
import Income from "./components/income/Income";
import CreateIncome from "./components/income/CreateIncome";
import EditIncome from "./components/income/EditIncome";
import Purchases from "./components/purchase/Purchases";
import CreatePurchase from "./components/purchase/CreatePurchase";
import EditPurchase from "./components/purchase/EditPurchase";
import PurchaseDetails from "./components/purchase/PurchaseDetails2";
import PosMainPage from "./frontend/components/PosMainPage";
import PrintData from "./frontend/components/printModal/PrintData";
import Sales from "./components/sales/Sales";
import CreateSale from "./components/sales/CreateSale";
import EditSale from "./components/sales/EditSale";
import SaleReturn from "./components/saleReturn/SaleReturn";
import CreateSaleReturn from "./components/saleReturn/CreateSaleReturn";
import EditSaleReturn from "./components/saleReturn/EditSaleReturn";
import SaleReturnDetails from "./components/saleReturn/SaleReturnDetails";
import SaleDetails from "./components/sales/SaleDetails";
import PurchaseReturn from "./components/purchaseReturn/PurchaseReturn";
import CreatePurchaseReturn from "./components/purchaseReturn/CreatePurchaseReturn";
import EditPurchaseReturn from "./components/purchaseReturn/EditPurchaseReturn";
import PurchaseReturnDetails from "./components/purchaseReturn/PurchaseReturnDetails";
import WarehouseReport from "./components/report/warehouseReport/WarehouseReport";
import SaleReport from "./components/report/saleReport/SaleReport";
import StockReport from "./components/report/stockReport/StockReport";
import StockDetails from "./components/report/stockReport/StockDetails";
import TopSellingProductsReport from "./components/report/topSellingReport/TopSellingProductsReport";
import PurchaseReport from "./components/report/purchaseReport/PurchaseReport";
import PrintBarcode from "./components/printBarcode/PrintBarcode";
import { Permissions } from "./constants";
import Role from "./components/roles/Role";
import CreateRole from "./components/roles/CreateRole";
import EditRole from "./components/roles/EditRole";
import Adjustments from "./components/adjustments/Adjustments";
import CreateAdjustment from "./components/adjustments/CreateAdjustment";
import EditAdjustMent from "./components/adjustments/EditAdjustMent";
import WarehouseDetail from "./components/warehouse/WarehouseDetail";
import ProductQuantityReport from "./components/report/productQuantityReport/ProductQuantityReport";
import Transfers from "./components/transfers/Transfers";
import EditTransfer from "./components/transfers/EditTransfer";
import CreateTransfer from "./components/transfers/CreateTransfer";
import Prefixes from "./components/settings/Prefixes";
import SuppliersReport from "./components/report/supplier-report/SuppliersReport";
import SupplierReportDetails from "./components/report/supplier-report/SupplierReportDetails";
import EmailTemplates from "./components/Email-templates/EmailTemplates";
import EditEmailTemplate from "./components/Email-templates/EditEmailTemplate";
import Quotations from "./components/quotations/Quotations";
import CreateQuotation from "./components/quotations/CreateQuotation";
import EditQuotation from "./components/quotations/EditQuotation";
import CreateQuotationSale from "./components/quotations/CreateQuotationSale";
import QuotationDetails from "./components/quotations/QuotationDetails";
import MailSettings from "./components/settings/MailSettings";
import SmsTemplates from "./components/sms-templates/SmsTemplates";
import EditSmsTemplate from "./components/sms-templates/EditSmsTemplate";
import BestCustomerReport from "./components/report/best-customerReport/BestCustomerReport";
import ProfitLossReport from "./components/report/ProfitLossReport/ProfitLossReport";
import CustomerReportDetails from "./components/report/customer-report/CustomerReportDetails";
import CustomersReport from "./components/report/customer-report/CustomersReport";
import SmsApi from "./components/sms-api/SmsApi";
import CreateSaleSaleReturn from "./components/sales/CreateSaleSaleReturn";
import EditSaleReturnFromSale from "./components/saleReturn/EditSaleReturnFromSale";

import Books from "../src/components/books/Books";
import EBooks from "../src/components/books/EBooks";
import UpcommingBooks from "../src/components/books/UpcommingBooks";
import IssuedBooks from "../src/components/books-circulation/IssuedBooks";
import ReservedBooks from "../src/components/books-circulation/ReservedBooks";

import BooksCirculation from "../src/components/books-circulation/BooksCirculation";
import Members from "../src/components/members/Members";
import Authors from "./components/authors/Authors";
import Genres from "./components/genres/Genres";
import Publishers from "./components/publishers/Publishers";
import BookLanguages from "./components/book-languages/BookLanguages";
import Tags from "./components/tags/Tags";
import MembershipPlans from "./components/membership-plans/MembershipPlans";
import Subscriptions from "./components/subscriptions/Subscriptions";
import BooksSeries from "./components/books-series/BooksSeries";
import BookRequests from "./components/book-requests/BookRequests";
import Penalties from "./components/Penalties/Penalties";
import About from "./components/About/About";
import PayemntSuccess from "./components/About/PayemntSuccess";
import PaymentFailed from "./components/About/PaymentFailed";
import BookDetails from "./components/book-details/BookDetails";
import BookDetails2 from "./components/book-details/BookDetails2";
import LMSDashboard from "./components/lms-dashboard/Dashboard";
import CreateBook from "./components/books/CreateBook";
import ImportBook from "./components/import-book/ImportBook";
import CreateMember from "./components/members/CreateMember";
import LMSSettings from "./components/lms-settings/Settings";
import LMSHomeSettings from "./components/home-settings/HomeSettings";
import LMSTestimonials from "./components/testimonials/Testimonials";
import MemberDetails from "./components/member-details/MemberDetails";
import EditMember from "./components/members/EditMember";

import BookCirculationDetails from "./components/book-circulation-details/BookCirculationDetails";

import CreateBookSeries from "./components/books-series/CreateBookSeries";
import EditBookSeries from "./components/books-series/EditBookSeries";
import CreateSubscription from "./components/subscriptions/createSubscription";
import SanctionLetters from "./components/bookRequestLetter/sanctionLetters";
import CreateSanctionLetter from "./components/bookRequestLetter/createSanctionLetter";
import EditSanctionLetter from "./components/edit-sanction-letter/editSanctionLetter";
import TestComponent from "./components/Testing/TestComponent";
import DisplayContact from "./components/newMemberApp/DisplayContact";
import Resources from "./components/resources/Resources";
import CreateResources from "./components/resources/CreateResources";
import ResourceCategory from "./components/resourceCategory/ResourceCategory";
import Received from "./components/transfers/Received";
import EditResources from "./components/resources/EditResources";
import EditSanctionLetter2 from "./components/edit-resources/editSanctionLetter2";
import Transactions from "./components/books-circulation/Transactions";
import Attandance from "../src/components/members/Attendance";
import CreateAttendanceMember from "./components/books-circulation/CreateAttendanceMember";
export const route = [
    {
        path: "create-subscription",
        ele: <CreateSubscription />,
        permission: "",
    },
    {
        path: "resource-category",
        ele: <ResourceCategory />,
        permission: "",
    },
    {
        path: "resources/new",
        ele: <CreateResources />,
        permission: "",
    },
    {
        path: "resources",
        ele: <Resources />,
        permission: "",
    },

    {
        path: "issued-books",
        ele: <IssuedBooks />,
        permission: Permissions.ISSUE_BOOKS,
    },
    {
        path: "reserved-books",
        ele: <ReservedBooks />,
        permission: Permissions.MANANGE_BOOK_REQUEST,
    },

    {
        path: "pos-dashboard",
        ele: <POSDashboard />,
        permission: "",
    },
    {
        path: "lms-dashboard",
        ele: <LMSDashboard />,
        permission: "",
    },
    {
        path: "books",
        ele: <Books />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "ebooks",
        ele: <EBooks />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "books/new",
        ele: <CreateBook />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "books/import-book",
        ele: <ImportBook />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "books/:id/:library_id/details",
        ele: <BookDetails />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "books/:id/:library_id/details2",
        ele: <BookDetails2 />,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        path: "books-circulation",
        ele: <BooksCirculation />,
        permission: Permissions.MANANGE_BOOK_REQUEST,
    },
    {
        path: "transactions",
        ele: <Transactions />,
        permission: Permissions.MANAGE_PENALTIES,
    },


    {
        path: "books-circulation/:id/details",
        ele: <BookCirculationDetails />,
        permission: Permissions.MANANGE_BOOK_REQUEST,
    },

    {
        path: "members",
        ele: <Members />,
        permission: Permissions.MANAGE_MEMBERS,
    },

    {
        path: "attendance",
        ele: <Attandance />,
        permission: Permissions.MANAGE_MEMBERS,
    },

    {
        path: "members/new",
        ele: <CreateMember />,
        permission: Permissions.MANAGE_MEMBERS,
    },

    {
        path: "attendance/new",
        ele: <CreateAttendanceMember />,
        permission: Permissions.MANAGE_MEMBERS,
    },

    {
        path: "members/:id/details",
        ele: <MemberDetails />,
        permission: Permissions.MANAGE_MEMBERS,
    },
    {
        path: "members/:id/edit",
        ele: <EditMember />,
        permission: Permissions.MANAGE_MEMBERS,
    },

    {
        path: "genres",
        ele: <Genres />,
        permission: Permissions.MANAGE_GENRES,
    },
    {
        path: "authors",
        ele: <Authors />,
        permission: Permissions.MANAGE_AUTHORS,
    },
    {
        path: "publishers",
        ele: <Publishers />,
        permission: Permissions.MANAGE_PUBLISHERS,
    },
    {
        path: "book-languages",
        ele: <BookLanguages />,
        permission: Permissions.MANAGE_BOOK_LANGUAGES,
    },
    {
        path: "tags",
        ele: <Tags />,
        permission: Permissions.MANAGE_TAGS,
    },
    {
        path: "membership-plans",
        ele: <MembershipPlans />,
        permission: Permissions.MANAGE_PLANS,
    },
    {
        path: "subscriptions",
        ele: <Subscriptions />,
        permission: Permissions.MANAGE_SUBSCRIPTIONS,
    },
    {
        path: "books-series",
        ele: <BooksSeries />,
        permission: Permissions.MANAGE_BOOK_SERIES,
    },
    {
        path: "books-series/new",
        ele: <CreateBookSeries />,
        permission: Permissions.MANAGE_BOOK_SERIES,
    },
    {
        path: "books-series/:id/edit",
        ele: <EditBookSeries />,
        permission: Permissions.MANAGE_BOOK_SERIES,
    },
    {
        path: "book-requests",
        ele: <BookRequests />,
        permission: Permissions.MANANGE_BOOK_REQUEST,
    },
    {
        path: "penalties",
        ele: <Penalties />,
        permission: Permissions.MANAGE_PENALTIES,
    },
    {
        path: "how-it-work",
        ele: <About />,
        permission: Permissions.MANAGE_PENALTIES,
    },
    {
        path: "lms-settings",
        ele: <LMSSettings />,
        permission: Permissions.MANAGE_SETTINGS,
    },
    {
        path: "lms-home-settings",
        ele: <LMSHomeSettings />,
        permission: Permissions.MANAGE_SETTINGS,
    },

    {
        path: "brands",
        ele: <Brands />,
        permission: Permissions.MANAGE_BRANDS,
    },
    {
        path: "currencies",
        ele: <Currencies />,
        permission: Permissions.MANAGE_CURRENCY,
    },
    {
        path: "library",
        ele: <Warehouses />,
        permission: Permissions.MANAGE_WAREHOUSES,
    },
    {
        path: "library/create",
        ele: <CreateWarehouse />,
        permission: Permissions.MANAGE_WAREHOUSES,
    },
    {
        path: "library/edit/:id",
        ele: <EditWarehouse />,
        permission: Permissions.MANAGE_WAREHOUSES,
    },
    {
        path: "library/detail/:id",
        ele: <WarehouseDetail />,
        permission: Permissions.MANAGE_WAREHOUSES,
    },
    {
        path: "product-categories",
        ele: <ProductCategory />,
        permission: Permissions.MANAGE_PRODUCT_CATEGORIES,
    },
    {
        path: "units",
        ele: <Units />,
        permission: Permissions.MANAGE_UNITS,
    },
    {
        path: "suppliers",
        ele: <Suppliers />,
        permission: Permissions.MANAGE_SUPPLIERS,
    },
    {
        path: "suppliers/create",
        ele: <CreateSupplier />,
        permission: Permissions.MANAGE_SUPPLIERS,
    },
    {
        path: "suppliers/edit/:id",
        ele: <EditSupplier />,
        permission: Permissions.MANAGE_SUPPLIERS,
    },
    {
        path: "customers",
        ele: <Customers />,
        permission: Permissions.MANAGE_CUSTOMERS,
    },
    {
        path: "customers/create",
        ele: <CreateCustomer />,
        permission: Permissions.MANAGE_CUSTOMERS,
    },
    {
        path: "customers/edit/:id",
        ele: <EditCustomer />,
        permission: Permissions.MANAGE_CUSTOMERS,
    },
    {
        path: "users",
        ele: <User />,
        permission: Permissions.MANAGE_USER,
    },
    {
        path: "users/create",
        ele: <CreateUser />,
        permission: Permissions.MANAGE_USER,
    },
    {
        path: "users/edit/:id",
        ele: <EditUser />,
        permission: Permissions.MANAGE_USER,
    },
    {
        path: "users/detail/:id",
        ele: <UserDetail />,
        permission: Permissions.MANAGE_USER,
    },
    {
        path: "profile/edit",
        ele: <UpdateProfile />,
        permission: "",
    },
    {
        path: "products",
        ele: <Product />,
        permission: Permissions.MANAGE_PRODUCTS,
    },

    {
        path: "products/create",
        ele: <CreateProduct />,
        permission: Permissions.MANAGE_PRODUCTS,
    },
    {
        path: "products/edit/:id",
        ele: <EditProduct />,
        permission: Permissions.MANAGE_PRODUCTS,
    },
    {
        path: "products/detail/:id",
        ele: <ProductDetail />,
        permission: Permissions.MANAGE_PRODUCTS,
    },
    {
        path: "adjustments",
        ele: <Adjustments />,
        permission: Permissions.MANAGE_ADJUSTMENTS,
    },
    {
        path: "adjustments/create",
        ele: <CreateAdjustment />,
        permission: Permissions.MANAGE_ADJUSTMENTS,
    },
    {
        path: "adjustments/:id",
        ele: <EditAdjustMent />,
        permission: Permissions.MANAGE_ADJUSTMENTS,
    },
    {
        path: "lmpos-settings",
        ele: <Settings />,
        permission: Permissions.MANAGE_SETTING,
    },
    {
        path: "prefixes",
        ele: <Prefixes />,
        permission: Permissions.MANAGE_SETTING,
    },
    {
        path: "mail-settings",
        ele: <MailSettings />,
        permission: Permissions.MANAGE_SETTING,
    },
    {
        path: "expense-categories",
        ele: <ExpenseCategory />,
        permission: Permissions.MANAGE_EXPENSES_CATEGORIES,
    },
    {
        path: "expenses",
        ele: <Expenses />,
        permission: Permissions.MANAGE_EXPENSES,
    },
    {
        path: "expenses/create",
        ele: <CreateExpense />,
        permission: Permissions.MANAGE_EXPENSES,
    },
    {
        path: "expenses/edit/:id",
        ele: <EditExpense />,
        permission: Permissions.MANAGE_EXPENSES,
    },

    {
        path: "income",
        ele: <Income />,
        permission: Permissions.MANAGE_EXPENSES,
    },
    {
        path: "income/create",
        ele: <CreateIncome />,
        permission: Permissions.MANAGE_EXPENSES,
    },
    {
        path: "income/edit/:id",
        ele: <EditIncome />,
        permission: Permissions.MANAGE_EXPENSES,
    },
    {
        path: "purchases",
        ele: <Purchases />,
        permission: Permissions.MANAGE_PURCHASE,
    },
    {
        path: "purchases/create",
        ele: <CreatePurchase />,
        permission: Permissions.MANAGE_PURCHASE,
    },
    {
        path: "purchases/edit/:id",
        ele: <EditPurchase />,
        permission: Permissions.MANAGE_PURCHASE,
    },
    {
        path: "purchases/detail/:id",
        ele: <PurchaseDetails />,
        permission: Permissions.MANAGE_PURCHASE,
    },
    {
        path: "pos",
        ele: <PosMainPage />,
        permission: Permissions.MANAGE_POS_SCREEN,
    },
    {
        path: "/payment",
        ele: <PrintData />,
        permission: "",
    },
    {
        path: "user-detail",
        ele: <UserDetail />,
        permission: Permissions.MANAGE_USER,
    },
    {
        path: "sales",
        ele: <Sales />,
        permission: Permissions.MANAGE_SALE,
    },
    {
        path: "sales/create",
        ele: <CreateSale />,
        permission: Permissions.MANAGE_SALE,
    },
    {
        path: "sales/edit/:id",
        ele: <EditSale />,
        permission: Permissions.MANAGE_SALE,
    },
    {
        path: "sales/return/:id",
        ele: <CreateSaleReturn />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "sales/return/edit/:id",
        ele: <EditSaleReturnFromSale />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "quotations",
        ele: <Quotations />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "quotations/create",
        ele: <CreateQuotation />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "quotations/edit/:id",
        ele: <EditQuotation />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "quotations/Create_sale/:id",
        ele: <CreateQuotationSale />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "quotations/detail/:id",
        ele: <QuotationDetails />,
        permission: Permissions.MANAGE_QUOTATION,
    },
    {
        path: "sale-return",
        ele: <SaleReturn />,
        permission: Permissions.MANAGE_SALE_RETURN,
    },
    {
        path: "sale-return/edit/:id",
        ele: <EditSaleReturn />,
        permission: Permissions.MANAGE_SALE_RETURN,
    },
    {
        path: "sale-return/detail/:id",
        ele: <SaleReturnDetails />,
        permission: Permissions.MANAGE_SALE_RETURN,
    },
    {
        path: "sales/detail/:id",
        ele: <SaleDetails />,
        permission: Permissions.MANAGE_SALE,
    },
    {
        path: "purchase-return",
        ele: <PurchaseReturn />,
        permission: Permissions.MANAGE_PURCHASE_RETURN,
    },
    {
        path: "purchase-return/create",
        ele: <CreatePurchaseReturn />,
        permission: Permissions.MANAGE_PURCHASE_RETURN,
    },
    {
        path: "purchase-return/edit/:id",
        ele: <EditPurchaseReturn />,
        permission: Permissions.MANAGE_PURCHASE_RETURN,
    },
    {
        path: "purchase-return/detail/:id",
        ele: <PurchaseReturnDetails />,
        permission: Permissions.MANAGE_PURCHASE_RETURN,
    },
    {
        path: "report/report-library",
        ele: <WarehouseReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-sale",
        ele: <SaleReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-stock",
        ele: <StockReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-detail-stock/:id",
        ele: <StockDetails />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-top-selling-products",
        ele: <TopSellingProductsReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-product-quantity",
        ele: <ProductQuantityReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/report-purchase",
        ele: <PurchaseReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/suppliers",
        ele: <SuppliersReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/profit-loss",
        ele: <ProfitLossReport />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "report/suppliers/details/:id",
        ele: <SupplierReportDetails />,
        permission: Permissions.MANAGE_REPORTS,
    },
    {
        path: "print/barcode",
        ele: <PrintBarcode />,
        permission: Permissions.MANAGE_PRODUCTS,
    },
    {
        path: "roles",
        ele: <Role />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "roles/create",
        ele: <CreateRole />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "roles/edit/:id",
        ele: <EditRole />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "transfers",
        ele: <Transfers />,
        permission: Permissions.MANAGE_TRANSFERS,
    },
    {
        path: "received",
        ele: <Received />,
        permission: Permissions.MANAGE_TRANSFERS,
    },
    {
        path: "transfers/create",
        ele: <CreateTransfer />,
        permission: Permissions.MANAGE_TRANSFERS,
    },
    {
        path: "transfers/:id",
        ele: <EditTransfer />,
        permission: Permissions.MANAGE_TRANSFERS,
    },
    {
        path: "email-templates",
        ele: <EmailTemplates />,
        permission: Permissions.MANAGE_EMAIL_TEMPLATES,
    },
    {
        path: "email-templates/:id",
        ele: <EditEmailTemplate />,
        permission: Permissions.MANAGE_EMAIL_TEMPLATES,
    },
    {
        path: "sms-templates",
        ele: <SmsTemplates />,
        permission: Permissions.MANAGE_SMS_TEMPLATES,
    },
    {
        path: "sms-templates/:id",
        ele: <EditSmsTemplate />,
        permission: Permissions.MANAGE_SMS_TEMPLATES,
    },
    {
        path: "report/best-customers",
        ele: <BestCustomerReport />,
        permission: "",
    },
    {
        path: "report/customers",
        ele: <CustomersReport />,
        permission: "",
    },
    {
        path: "report/customers/details/:id",
        ele: <CustomerReportDetails />,
        permission: "",
    },
    {
        path: "sms-api",
        ele: <SmsApi />,
        permission: Permissions.MANAGE_SMS_API,
    },
    {
        path: "sanction-letters",
        ele: <SanctionLetters />,
        permission: Permissions.MANAGE_SANCTION_LETTERS,
    },
    {
        path: "sanction-letters/create",
        ele: <CreateSanctionLetter />,
        permission: "",
    },
    {
        path: "sanction-letters/edit/:id",
        ele: <EditSanctionLetter />,
        permission: "",
    },

    {
        path: "resources/edit/:id",
        ele: <EditSanctionLetter2 />,
        permission: "",
    },
];
