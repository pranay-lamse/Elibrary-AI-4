import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ChangeLanguageForm from "../../member/components/change-language/ChangeLanguageForm";
import ChangePassword from "../../member/components/change-password/ChangePassword";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { getCurrentMember } from "../../shared/sharedMethod";
import { toggleChangeLanguageModal } from "../../store/action/changeLanguageModalAction";
import { toggleChangePasswordModal } from "../../store/action/changePasswordModalAction";
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
                        <h2>Terms of Usage</h2>
                        <p>
                            Welcome to our e-library web portal! Before using
                            our platform, please read the following terms and
                            conditions carefully. By accessing or using our
                            website, you agree to be bound by these terms and
                            conditions. If you do not agree to these terms and
                            conditions, you may not use our platform.
                        </p>
                        <p>
                            <b>Access and Use</b> <br />
                            Our e-library web portal is designed to provide you
                            with access to both digital and physical books,
                            magazines, journals, and other educational
                            resources. You may use our platform for personal,
                            educational, or research purposes only. You may not
                            use our platform for any commercial purposes without
                            our prior written consent.
                        </p>
                        <p>
                            <b>Intellectual Property</b> <br />
                            All content on our platform, including but not
                            limited to text, graphics, images, logos, and
                            software, is the property of our e-library web
                            portal or its content providers and is protected by
                            copyright, trademark, and other intellectual
                            property laws. You may not copy, modify, reproduce,
                            distribute, transmit, display, or sell any content
                            on our platform without our prior written consent.
                        </p>
                        <p>
                            <b>User Accounts</b> <br />
                            To access certain features of our platform, you may
                            be required to create a user account. You are
                            responsible for maintaining the confidentiality of
                            your account information, including your username
                            and password, and for all activities that occur
                            under your account. You may not share your account
                            information with any third party or allow any third
                            party to access your account.
                        </p>
                        <p>
                            <b>Physical Books</b> <br />
                            Our e-library web portal also provides access to
                            physical books and other materials at our physical
                            library. To borrow physical books, you must be a
                            registered member of our physical library and abide
                            by the borrowing terms and conditions set forth by
                            our physical library.
                        </p>
                        <p>
                            <b>User Conduct</b> <br />
                            You may not use our platform to engage in any
                            unlawful, harmful, or fraudulent activity. You may
                            not upload, post, or transmit any content that is
                            offensive, defamatory or infringes on the
                            intellectual property rights of others.
                        </p>
                        <p>
                            <b>Disclaimer of Warranties</b> <br />
                            Our e-library web portal is provided on an "as is"
                            and "as available" basis. We do not guarantee that
                            our platform will be error-free or uninterrupted. We
                            do not warrant that any content on our platform is
                            accurate, complete, or up-to-date.
                        </p>
                        <p>
                            <b>Limitation of Liability</b> <br />
                            In no event shall our e-library web portal be liable
                            for any direct, indirect, incidental, special, or
                            consequential damages arising out of or in
                            connection with your use of our platform.
                        </p>
                        <p>
                            <b>Indemnification</b> <br />
                            You agree to indemnify and hold our e-library web
                            portal and its affiliates, officers, employees, and
                            agents harmless from any claim or demand, including
                            reasonable attorneys' fees, made by any third party
                            due to or arising out of your use of our platform or
                            your violation of these terms and conditions.
                        </p>
                        <p>
                            <b>Governing Law</b> <br />
                            These terms and conditions shall be governed by and
                            construed in accordance with the laws of India. Any
                            disputes arising out of or in connection with these
                            terms and conditions shall be resolved in accordance
                            with the laws of India.
                        </p>
                        <p>
                            <b>Modification of Terms and Conditions</b> <br />
                            We reserve the right to modify these terms and
                            conditions at any time without prior notice. Your
                            continued use of our platform after any such
                            modifications shall constitute your acceptance of
                            the revised terms and conditions. Thank you for
                            choosing our e-library web portal, and we hope that
                            you enjoy your learning journey with us, both online
                            and in-person.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default React.memo(Terms);
