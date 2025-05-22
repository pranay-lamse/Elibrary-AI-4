import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Radio from "../../../shared/components/Radio";
import {
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";

const HomeTab = (props) => {
    const { onChangeInput, onSearch } = props;
    const [activeTab, setActiveTab] = useState("bookTab");
    const [isBookChecked, setIsBookChecked] = useState(true);
    const [isAuthorChecked, setIsAuthorChecked] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const onCheckedBook = (e) => {
        setActiveTab("bookTab");
        setIsBookChecked((prev) => (prev = !isBookChecked));
        setIsAuthorChecked((prev) => (prev = false));
        setInputValue((prev) => (prev = ""));
    };

    const onCheckedAuthor = (e) => {
        setActiveTab("authorTab");
        setIsAuthorChecked((prev) => (prev = !isAuthorChecked));
        setIsBookChecked((prev) => (prev = false));
        setInputValue((prev) => (prev = ""));
    };

    const onChangeInputData = (event) => {
        onChangeInput(event);
        setInputValue((prev) => (prev = event.target.value));
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        active={activeTab === "bookTab"}
                        onClick={(e) => onCheckedBook(e)}
                    >
                        <div className="book-form__filter-by">
                            <Field
                                name="filter_by"
                                label={placeholderText(
                                    "books.radio.book.label"
                                )}
                                checked={isBookChecked}
                                component={Radio}
                            />
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={activeTab === "authorTab"}
                        onClick={(e) => onCheckedAuthor(e)}
                    >
                        <div className="">
                            <Field
                                name="filter_by"
                                label={placeholderText(
                                    "books.radio.author.label"
                                )}
                                checked={isAuthorChecked}
                                component={Radio}
                            />
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="bookTab">
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="Book Name"
                            value={inputValue}
                            onChange={(e) => onChangeInputData(e)}
                        />
                        <span
                            className="landing-search-box__search-icon d-flex justify-content-center align-items-center"
                            onClick={() => onSearch()}
                        >
                            <i className="fa fa-search" />
                        </span>
                    </div>
                </TabPane>
                <TabPane tabId="authorTab">
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="Author Name"
                            value={inputValue}
                            onChange={(e) => onChangeInputData(e)}
                        />
                        <span
                            className="landing-search-box__search-icon d-flex justify-content-center align-items-center"
                            onClick={() => onSearch("author")}
                        >
                            <i className="fa fa-search" />
                        </span>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    );
};

HomeTab.propTypes = {
    onChangeInput: PropTypes.func,
    onSearch: PropTypes.func,
};

export default reduxForm({ form: "bookSearchForm" })(HomeTab);
