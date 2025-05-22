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

function Privacy_policy() {
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
                        <h2>Privacy Policy</h2>
                        <p>
                            <b>Privacy Policy</b> <br />
                            We take your privacy seriously at our library, and
                            we are committed to protecting your personal
                            information. This privacy policy describes how we
                            collect, use, and share your personal information
                            when you use our online platform and borrow physical
                            books from our physical library.
                        </p>
                        <p>
                            <b>Information We Collect</b> <br />
                            We collect personal information from you when you
                            create an account on our online platform or register
                            as a member of our physical library. This
                            information may include your name, email address,
                            physical address, and phone number. We also collect
                            information about your use of our online platforms,
                            such as your browsing history, search queries, and
                            the books you have checked out or placed on hold. We
                            may use cookies and other tracking technologies to
                            collect this information.
                        </p>
                        <p>
                            <b>How We Use Your Information</b> <br />
                            We use your personal information to provide you with
                            access to our online platform and physical library
                            services, to communicate with you about your account
                            and book loans, and to improve our services. We may
                            also use your personal information for marketing
                            purposes, such as sending you promotional emails or
                            newsletters about new books and events.
                        </p>
                        <p>
                            <b>Security of Your Information</b> <br />
                            We take reasonable measures to protect your personal
                            information from unauthorized access, disclosure, or
                            misuse. However, no security measures are foolproof,
                            and we cannot guarantee the security of your
                            personal information.
                        </p>

                        <p>
                            <b>Your Rights and Choices</b> <br />
                            You have the right to access and update your
                            personal information and to opt out of receiving
                            marketing communications from us. You may do so by
                            logging into your account on our online platform or
                            contacting us at the email address provided below.
                        </p>
                        <p>
                            <b>Changes to this Privacy Policy</b> <br />
                            We reserve the right to modify this privacy policy
                            at any time without prior notice. Any changes to
                            this privacy policy will be posted on our website
                            and will become effective immediately upon posting.
                        </p>
                        <p>
                            <b>Contact Us</b> <br />
                            If you have any questions or concerns about this
                            privacy policy, please contact us at
                            info@educron.com, info@createonlineacademy.com
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Privacy_policy;
