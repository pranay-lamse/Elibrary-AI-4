import React, { useEffect, useState } from "react";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { getCurrentMember } from "../../shared/sharedMethod";
import Header from "./Header";
import Footer from "./Footer";

function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    return (
        <div>
            <ProgressBar />
            <Header />
            <section className="term_section">
                <div className="container">
                    <div className="terms">
                        <h2>Disclaimer</h2>

                        <p>
                            The e-books are available on the E-Library portal of
                            Smart City Library. They are provided under the
                            concept of fair dealing for the Educational purposes
                            of the Library members.
                        </p>
                        <p>
                            The contractor of the E-Library has made reasonable
                            efforts to obtain permission for copyrighted books
                            and digitize the physical books listed as e-books in
                            the portal. However, it is essential to note that
                            the contractor does not claim ownership of the
                            copyright to these books.
                        </p>
                        <p>
                            The contractor acknowledges that the copyright to
                            the books remains with the respective authors,
                            publishers, and copyright holders. The purpose of
                            providing e-book formats on the E-Library portal is
                            to facilitate access to educational resources for
                            students and visitors of the Library.
                        </p>
                        <p>
                            Users of the E-Library portal are solely responsible
                            for using the e-books. They must adhere to the
                            provisions of the Indian Copyright Law and any other
                            applicable laws and regulations. The contractor does
                            not assume any responsibility or liability for any
                            misuse or copyright infringement resulting from
                            using the e-books.
                        </p>
                        <p>
                            It is advised that users of the E-Library portal
                            respect the rights of the copyright holders and
                            utilize the e-books for personal, educational, and
                            non-commercial purposes only. Any unauthorized
                            reproduction, distribution, or modification of the
                            e-books may infringe upon the rights of the
                            copyright holders and is strictly prohibited.
                        </p>
                        <p>
                            The contractor of the E-Library portal disclaims any
                            liability for any legal consequences or claims
                            arising from the use or misuse of the e-books
                            available on the portal. Users should exercise their
                            own judgment, take necessary precautions when using
                            the e-books, and seek appropriate permissions or
                            licenses from the copyright holders if required.
                        </p>
                        <p>
                            <b>Reporting Abuse:</b> <br />
                            Smart City Library is committed to upholding
                            copyright laws and respecting the rights of
                            copyright holders. Suppose you believe that any of
                            the e-books available on the portal infringe upon
                            your copyright or the copyright of someone you
                            represent. In that case, we encourage you to report
                            such instances of abuse promptly.
                        </p>
                        <p>
                            To report abuse regarding copyrighted books on the
                            E-Library portal, don't hesitate to contact us at
                            info@educron.com , info@createonlineacademy.com We
                            will thoroughly investigate all reports of abuse and
                            take appropriate actions in accordance with the law.
                        </p>
                        <p>
                            By accessing and using the E-Library portal, users
                            agree to abide by this disclaimer, the Terms of
                            Usage outlined by Smart City Library, and the
                            responsibility to report any instances of abuse or
                            copyright infringement.
                        </p>
                        <p>
                            Please note that the contractor reserves the right
                            to remove any e-books from the portal if there is a
                            reasonable belief of copyright infringement or
                            violation of the Terms of Usage.
                        </p>
                    </div>
                    <a
                        type="button"
                        href={
                            location.origin +
                            "/public/uploads/desclaimer/Disclaimer.docx"
                        }
                        className="ml-3 frontend-btn btn btn-info"
                    >
                        <span>Download</span>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Terms;
