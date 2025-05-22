import React, { useEffect, useRef, useState } from "react";

import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
    addContact,
    fetchContacts,
} from "../../member/store/actions/frontendContactAction";
import { getCurrentMember } from "../../shared/sharedMethod";
import { fetchBooksSeriesWithoutToken } from "../../admin/store/actions/bookSeriesAction";

function BookSeries(props) {
    const { fetchBooksSeriesWithoutToken, booksSeries } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const member = getCurrentMember();
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchBooksSeriesWithoutToken();
    }, []);

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    console.log({ booksSeries });

    return (
        <div className="content-wrapper">
            <ProgressBar />
            <Header />
            <section id="contact" className="p-80px-tb ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
                            <div className="section-title-center text-center">
                                <span>Book Series</span>
                                <h2 className="display-6">
                                    We'd love to hear from youP
                                </h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { booksSeries } = state;
    console.log({ state });
    return {
        booksSeries,
    };
};

export default connect(mapStateToProps, { fetchBooksSeriesWithoutToken })(
    React.memo(BookSeries)
);
