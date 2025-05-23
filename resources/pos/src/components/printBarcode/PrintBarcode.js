import React, { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap-v5";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import ReactSelect from "../../shared/select/reactSelect";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllProducts } from "../../store/action/productAction";
import { preparePurchaseProductArray } from "../../shared/prepareArray/preparePurchaseArray";
import PrintTable from "./PrintTable";
import paperSize from "../../shared/option-lists/paperSize.json";
import { toastType } from "../../constants";
import { addToast } from "../../store/action/toastAction";
import BarcodeShow from "./BarcodeShow";
import PrintButton from "./PrintButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBill,
    faWallet,
    faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import ProductSearch from "../../shared/components/product-cart/search/ProductSearch2";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import _uniqueId from "lodash/uniqueId";

const PrintBarcode = () => {
    const {
        warehouses,
        products,
        purchaseProducts,
        customProducts = preparePurchaseProductArray(products),
    } = useSelector((state) => state);
    const [printBarcodeValue, setPrintBarcodeValue] = useState({
        warehouse_id: "",
        paperSizeValue: "",
    });
    const printBarcodeQuantity = useSelector((state) => state.printQuantity);
    const [updateProducts, setUpdateProducts] = useState([]);
    const [print, setPrint] = useState([]);
    const [isPrintShow, setIsPrintShow] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [errors, setErrors] = useState({
        warehouse_id: "",
        paperSizeValue: "",
    });
    const [updated, setUpdated] = useState(false);
    const componentRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllWarehouses());
        dispatch(fetchAllProducts());
    }, [quantity, purchaseProducts]);

    useEffect(() => {
        if (printBarcodeValue) {
            if (updateProducts.length) {
                setPrint(preparePrint);
            }
        }
    }, [updateProducts, printBarcodeValue, printBarcodeQuantity]);

    const onWarehouseChange = (obj) => {
        setPrintBarcodeValue((inputs) => ({ ...inputs, warehouse_id: obj }));
    };

    const onPaperSizeChange = (obj) => {
        setPrintBarcodeValue((inputs) => ({ ...inputs, paperSizeValue: obj }));
        setIsPrintShow(true);
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!printBarcodeValue.warehouse_id) {
            errorss["warehouse_id"] = getFormattedMessage(
                "purchase.select.warehouse.validate.label"
            );
        } else if (updateProducts.length === 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "purchase.product-list.validate.message"
                    ),
                    type: toastType.ERROR,
                })
            );
        } else if (!printBarcodeValue.paperSizeValue) {
            errorss["paperSizeValue"] = getFormattedMessage(
                "globally.paper.size.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onResetClick = () => {
        setUpdateProducts([]);
        setUpdated(false);
        setPrintBarcodeValue({
            warehouse_id: "",
            paperSizeValue: "",
        });
        setErrors({
            warehouse_id: "",
            paperSizeValue: "",
        });
    };

    const printPaymentReceiptPdf = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (isPrintShow === true && valid) {
            document.getElementById("printReceipt").click();
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const preparePrint = () => {
        const formValue = {
            products: updateProducts,
            paperSize: printBarcodeValue.paperSizeValue,
            printBarcodeQuantity: printBarcodeQuantity,
        };
        return formValue;
    };

    //on update function
    const onUpdateClick = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            setIsPrintShow(true);
            setUpdated(true);
        }
    };

    // print barcode
    const loadPrintBlock = () => {
        return (
            <div className="d-none">
                <button id="printReceipt" onClick={handlePrint}>
                    Print this out!
                </button>
                <PrintButton ref={componentRef} updateProducts={print} />
            </div>
        );
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("print.barcode.title")} />
            {print.length !== 0 ? loadPrintBlock() : ""}
            <div className="card card-body">
                <Col md={4} className=" mb-3 col-12">
                    <ReactSelect
                        name="warehouse_id"
                        data={warehouses}
                        onChange={onWarehouseChange}
                        title={getFormattedMessage("warehouse.title")}
                        errors={errors["warehouse_id"]}
                        defaultValue={printBarcodeValue.warehouse_id}
                        value={printBarcodeValue.warehouse_id}
                        placeholder={placeholderText(
                            "purchase.select.warehouse.placeholder.label"
                        )}
                    />
                </Col>
                <Col sm={12} className="mb-10">
                    <label className="form-label">
                        {getFormattedMessage(
                            "dashboard.stockAlert.product.label"
                        )}
                        :
                    </label>
                    <ProductSearch
                        values={printBarcodeValue}
                        products={products}
                        isAllProducts={true}
                        updateProducts={updateProducts}
                        handleValidation={handleValidation}
                        setUpdateProducts={setUpdateProducts}
                        customProducts={customProducts}
                    />
                </Col>
                <div className="col-12 md-12">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>
                                    {getFormattedMessage(
                                        "dashboard.stockAlert.product.label"
                                    )}
                                </th>
                                <th>
                                    {getFormattedMessage(
                                        "purchase.order-item.table.qty.column.label"
                                    )}
                                </th>
                                <th>
                                    {getFormattedMessage(
                                        "react-data-table.action.column.label"
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {printBarcodeValue.warehouse_id &&
                            updateProducts ? (
                                updateProducts.map((singleProduct, index) => {
                                    return (
                                        <PrintTable
                                            key={index}
                                            singleProduct={singleProduct}
                                            updateQty={updatedQty}
                                            updateProducts={updateProducts}
                                            setUpdateProducts={
                                                setUpdateProducts
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="fs-5 px-3 py-6 custom-text-center"
                                    >
                                        {getFormattedMessage(
                                            "sale.product.table.no-data.label"
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <Col className="ml-auto mb-5 col-12">
                    <ReactSelect
                        name="paperSizeValue"
                        data={paperSize}
                        onChange={onPaperSizeChange}
                        title={getFormattedMessage("paper.size.title")}
                        errors={errors["paperSizeValue"]}
                        defaultValue={printBarcodeValue.paperSizeValue}
                        value={printBarcodeValue.paperSizeValue}
                        placeholder={placeholderText(
                            "paper.size.placeholder.label"
                        )}
                    />
                </Col>
                <div className="d-xl-flex align-items-center justify-content-between">
                    <div className="d-xl-flex align-items-center justify-content-between">
                        <button
                            type="button"
                            className="btn btn-success me-5 text-white mb-2"
                            onClick={(event) => onUpdateClick(event)}
                        >
                            {getFormattedMessage("preview.title")}
                            <FontAwesomeIcon
                                icon={faMoneyBill}
                                className="ms-2"
                            />
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger me-5 mb-2"
                            onClick={() => onResetClick()}
                        >
                            {getFormattedMessage(
                                "date-picker.filter.reset.label"
                            )}
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="ms-2"
                            />
                        </button>
                        <Button
                            type="button"
                            variant="primary"
                            className="btn btn-primary me-5 mb-2"
                            onClick={(e) => printPaymentReceiptPdf(e)}
                        >
                            {getFormattedMessage("print.title")}
                            <FontAwesomeIcon icon={faWallet} className="ms-2" />
                        </Button>
                    </div>
                </div>
                {updateProducts
                    ? updateProducts.map((product, index) => {
                          return (
                              <BarcodeShow
                                  product={product}
                                  key={_uniqueId().toString()}
                                  paperSize={printBarcodeValue.paperSizeValue}
                                  updated={updated}
                              />
                          );
                      })
                    : ""}
            </div>
        </MasterLayout>
    );
};

export default PrintBarcode;
