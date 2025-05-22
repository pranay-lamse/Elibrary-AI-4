import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { InputGroup } from "react-bootstrap-v5";
import {
    getFormattedMessage,
    numValidate,
    placeholderText,
} from "../../shared/sharedMethod";
import { editExpense } from "../../store/action/expenseAction";
import ModelFooter from "../../shared/components/modelFooter";
import ReactSelect from "../../shared/select/reactSelect";
import ReactDatePicker from "../../shared/datepicker/ReactDatePicker";

const IncomeForm = (props) => {
    const {
        addExpenseData,
        id,
        editExpense,
        singleExpense,
        warehouses,
        expenseCategories,
        frontSetting,
        quotationPurchase,
    } = props;
    const navigate = useNavigate();
    const [expenseValue, setExpenseValue] = useState({
        date: singleExpense
            ? moment(singleExpense[0].date).toDate()
            : new Date(),

        amount: singleExpense ? singleExpense[0].amount : "",
        details: singleExpense ? singleExpense[0].details : "",
        title: singleExpense ? singleExpense[0].title : "",
    });

    const [errors, setErrors] = useState({
        date: "",
        title: "",

        amount: "",
        details: "",
    });

    const disabled =
        singleExpense &&
        singleExpense[0].title === expenseValue.title &&
        singleExpense[0].amount === expenseValue.amount &&
        singleExpense[0].details === expenseValue.details &&
        moment(singleExpense[0].date).toDate().toString() ===
            expenseValue.date.toString();

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!expenseValue["title"]) {
            errorss["title"] = getFormattedMessage(
                "income.input.title.validate.label"
            );
        } else if (!expenseValue["amount"]) {
            errorss["amount"] = getFormattedMessage(
                "income.input.amount.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setExpenseValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors("");
    };

    const handleCallback = (date) => {
        setExpenseValue((previousState) => {
            return { ...previousState, date: date };
        });
    };

    const prepareData = (prepareData) => {
        const formValue = {
            date: moment(prepareData.date).toDate(),
            title: prepareData.title,
            amount: prepareData.amount,
            details: prepareData.details,
        };
        return formValue;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleExpense && valid) {
            if (!disabled) {
                editExpense(id, prepareData(expenseValue), navigate);
            }
        } else {
            if (valid) {
                setExpenseValue(expenseValue);
                addExpenseData(prepareData(expenseValue));
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <Form>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "react-data-table.date.column.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <div className="position-relative">
                                <ReactDatePicker
                                    onChangeDate={handleCallback}
                                    newStartDate={expenseValue.date}
                                />
                            </div>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["date"] ? errors["date"] : null}
                            </span>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "income.input.title.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <input
                                type="type"
                                name="title"
                                className="form-control"
                                placeholder={placeholderText("title")}
                                onChange={(e) => onChangeInput(e)}
                                value={expenseValue.title || ""}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["title"] ? errors["title"] : null}
                            </span>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage("Amount")}:
                            </label>
                            <span className="required" />
                            <InputGroup>
                                <input
                                    type="text"
                                    name="amount"
                                    value={expenseValue.amount || ""}
                                    pattern="[0-9]*"
                                    min={0}
                                    className="form-control"
                                    onKeyPress={(event) => numValidate(event)}
                                    onChange={(e) => onChangeInput(e)}
                                />
                                <InputGroup.Text>
                                    {frontSetting.value &&
                                        frontSetting.value.currency_symbol}
                                </InputGroup.Text>
                            </InputGroup>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["amount"] ? errors["amount"] : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage("Details")}:{" "}
                            </label>
                            <textarea
                                name="details"
                                className="form-control"
                                rows="3"
                                onChange={(e) => onChangeInput(e)}
                                value={expenseValue.details || ""}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["detail"] ? errors["detail"] : null}
                            </span>
                        </div>
                        <ModelFooter
                            onEditRecord={singleExpense}
                            onSubmit={onSubmit}
                            editDisabled={disabled}
                            link="/admin/pos/expenses"
                            addDisabled={!expenseValue.amount}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { frontSetting } = state;
    return { frontSetting };
};

export default connect(mapStateToProps, { editExpense })(IncomeForm);
