import React, { useState, useEffect, useMemo } from "react";
import { constants, Filters } from "../../constants/index";
import { Button, Col } from "react-bootstrap-v5";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import FilterComponent from "../components/FilterComponent";
import { renderSortIcons } from "../../config/sortConfig";
import TableButton from "../action-buttons/TableButton";
import EmptyComponent from "../../components/empty-component/EmptyComponent";
import { getFormattedMessage } from "../sharedMethod";
import DateRangePicker from "../datepicker/DateRangePicker";
import FilterDropdown from "../filterMenu/FilterDropdown";
import { setProductUnitId } from "../../store/action/productUnitIdAction";
import Spinner from "../../shared/components/loaders/Spinner";

const ReactDataTable = (props) => {
    const {
        columns,
        AddButton,
        items,
        ButtonValue,
        to,
        defaultLimit = Filters.OBJ.page,
        onChange,
        totalRows,
        isShowPaymentModel,
        isCallSaleApi,
        isCallBrandApi,
        paginationRowsPerPageOptions = [10, 15, 25, 50, 100],
        isLoading,
        isShowDateRangeField,
        isShowFilterField,
        isWarehouseType,
        warehouseOptions,
        isStatus,
        isPaymentStatus,
        warehouseValue,
        isUnitFilter,
        title,
        isPdf,
        isReportPdf,
        isEXCEL,
        onExcelClick,
        isShowSearch,
        isPaymentType,
        subHeader = true,
        buttonImport,
        goToImportProduct,
        isTransferStatus,
        isExport,
        customerId,
        onReportPdfClick,
        pagination = true,
        handleSelectedRows,
        selectableRows,
    } = props;
    const [perPage, setPerPages] = useState(defaultLimit);
    const [pageSize, setPageSize] = useState(Filters.OBJ.pageSize);
    const [adminName, setAdminName] = useState(Filters.OBJ.adminName);
    const [created_at] = useState(Filters.OBJ.created_at);
    const [order_By, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [selectDate, setSelectDate] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [paymentType, setPaymentType] = useState();
    const [tableWarehouseValue, setTableWarehouseValue] = useState();
    const [status, setStatus] = useState();
    const [transferStatus, setTransferStatus] = useState();
    const [productUnit, setProductUnit] = useState();
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const tableColumns = useMemo(() => columns, []);
    useEffect(() => {
        if (items.length) {
            setIsVisible(true);
        }
        setTimeout(() => {
            setIsVisible(true);
        }, 1000);
    }, [items.length]);

    useEffect(() => {
        onChangeDidMount(currentPage);
        setAdminName(adminName);
    }, [
        currentPage,
        status,
        transferStatus,
        productUnit,
        warehouseValue,
        tableWarehouseValue,
        isShowPaymentModel,
        isCallSaleApi,
        isCallBrandApi,
        paymentStatus,
        paymentType,
        perPage,
        order_By,
        direction,
        searchText,
        pageSize,
        adminName,
        totalRows,
        selectDate,
    ]);
    const onStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setStatus(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const onTransferStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setTransferStatus(obj);
        setStatus(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const onPaymentStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setPaymentStatus(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const onProductUnitChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setProductUnit(obj);
        dispatch(setProductUnitId(obj.value));
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const onPaymentTypeChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setPaymentType(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const handleSearch = (searchText) => {
        handlePageChange(1);
        setSearchText(searchText);
    };

    const onDateSelector = (date) => {
        setSelectDate(date.params);
        dispatch({ type: constants.DATE_ACTION, payload: date.params });
    };

    const customSort = (column, sortDirection) => {
        if (column) {
            setOrderBy(column.sortField);
            setDirection(sortDirection);
        }
    };

    const onResetClick = () => {
        setStatus({ label: "All", value: "0" });
        setPaymentStatus({ label: "All", value: "0" });
        setPaymentType({ label: "All", value: "0" });
        setProductUnit({ label: "All", value: "0" });
        setTableWarehouseValue({ label: "All", value: "0" });
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    const onWarehouseChange = (obj) => {
        setTableWarehouseValue(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };

    // const array = warehouses
    // const newFirstElement = {attributes: {name: 'All Warehouse'}, id: null}
    // const newArray = [newFirstElement].concat(array)

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <>
                {isShowSearch ? (
                    ""
                ) : (
                    <FilterComponent handleSearch={handleSearch} />
                )}

                <Col
                    xxl={isShowSearch ? 12 : 8}
                    className="d-flex flex-wrap align-items-center justify-content-end col-12 col-md-8 col-lg-8"
                >
                    {isShowFilterField ? (
                        <FilterDropdown
                            paymentStatus={paymentStatus}
                            status={status}
                            title={title}
                            isPaymentStatus={isPaymentStatus}
                            productUnit={productUnit}
                            paymentType={paymentType}
                            isPaymentType={isPaymentType}
                            onStatusChange={onStatusChange}
                            isStatus={isStatus}
                            isTransferStatus={isTransferStatus}
                            onTransferStatusChange={onTransferStatusChange}
                            transferStatus={transferStatus}
                            show={show}
                            setShow={setShow}
                            isWarehouseType={isWarehouseType}
                            onWarehouseChange={onWarehouseChange}
                            tableWarehouseValue={tableWarehouseValue}
                            onProductUnitChange={onProductUnitChange}
                            warehouseOptions={warehouseOptions}
                            isUnitFilter={isUnitFilter}
                            onResetClick={onResetClick}
                            onPaymentStatusChange={onPaymentStatusChange}
                            onPaymentTypeChange={onPaymentTypeChange}
                        />
                    ) : null}
                    {AddButton}
                    {isPdf ? (
                        <div className="text-end">
                            <Button
                                type="button"
                                variant="primary"
                                href={to}
                                className=" btn-light-primary"
                            >
                                PDF
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isReportPdf ? (
                        <div className="text-end">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => onReportPdfClick()}
                                className="me-3 btn-light-primary"
                            >
                                PDF
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isEXCEL ? (
                        <div className="text-end">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => onExcelClick()}
                                className="me-3 btn-light-primary"
                            >
                                {" "}
                                {getFormattedMessage("excel.btn.label")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isExport ? (
                        <div className="text-end">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => onExcelClick()}
                                className="me-3 btn-light-primary"
                            >
                                {" "}
                                {getFormattedMessage("product.export.title")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isShowDateRangeField ? (
                        <DateRangePicker
                            onDateSelector={onDateSelector}
                            selectDate={selectDate}
                        />
                    ) : null}
                    {buttonImport ? (
                        <div className="text-end order-2">
                            <Button
                                variant="primary"
                                className="me-3 my-2 btn-light-primary"
                                onClick={goToImportProduct}
                            >
                                {getFormattedMessage("product.import.title")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {ButtonValue ? (
                        <TableButton ButtonValue={ButtonValue} to={to} />
                    ) : null}
                </Col>
            </>
        );
    }, []);

    const onChangeDidMount = (page) => {
        const filters = {
            order_By: order_By,
            page: currentPage,
            skip: (page - 1) * pageSize,
            pageSize: pageSize,
            direction: direction,
            adminName: adminName,
            created_at: created_at,
            search:
                searchText === ""
                    ? searchText === 1 || searchText === undefined
                        ? ""
                        : searchText.toLowerCase()
                    : "" || searchText !== ""
                    ? searchText.toLowerCase()
                    : "",
            start_date: selectDate ? selectDate.start_date : null,
            end_date: selectDate ? selectDate.end_date : null,
            payment_status: paymentStatus ? paymentStatus.value : null,
            payment_type: paymentType ? paymentType.value : null,
            status: status ? status.value : null,
            product_unit: productUnit ? productUnit.value : null,
            base_unit: productUnit ? productUnit.value : null,
            warehouse_id: warehouseValue
                ? warehouseValue.value
                : tableWarehouseValue
                ? tableWarehouseValue.value
                : null,
            customer_id: customerId ? customerId : null,
        };
        onChange(filters);
    };

    const handlePerRowsChange = async (recordPerPage) => {
        if (perPage !== recordPerPage) {
            setPerPages(recordPerPage);
            setPageSize(recordPerPage);
        }
    };

    const handlePageChange = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }

        const pagination = document.getElementById("pagination-first-page");
        if (page === 1 && pagination !== null) {
            pagination.click();
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: getFormattedMessage(
            "react-data-table.records-per-page.label"
        ),
    };

    const emptyStateProps = {
        isLoading: isLoading,
    };

    return (
        <div className="data-table pt-0 position-relative">
            {isVisible ? (
                <DataTable
                    columns={tableColumns}
                    noDataComponent={<EmptyComponent {...emptyStateProps} />}
                    data={items}
                    paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                    pagination={pagination}
                    onChangePage={handlePageChange}
                    paginationServer={true}
                    paginationComponentOptions={paginationComponentOptions}
                    subHeader={subHeader}
                    onSort={customSort}
                    sortServer
                    paginationTotalRows={totalRows}
                    subHeaderComponent={subHeaderComponentMemo}
                    onChangeRowsPerPage={handlePerRowsChange}
                    sortIcon={renderSortIcons(direction)}
                    persistTableHead={false}
                    selectableRows={selectableRows}
                    onSelectedRowsChange={handleSelectedRows}
                    selectableRowsHighlight
                />
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}
        </div>
    );
};

ReactDataTable.propTypes = {
    columns: PropTypes.array,
    paginationRowsPerPageOptions: PropTypes.array,
    defaultLimit: PropTypes.number,
    totalRows: PropTypes.number,
    onChange: PropTypes.func,
    sortAction: PropTypes.func,
};
export default ReactDataTable;
