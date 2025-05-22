import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MemberApp from "./member/index";
import AdminApp from "./PosApp";
import Hello from "./Hello";
import Resources from "./components/newMemberApp/Resources";

import ResourcesDetails from "./components/newMemberApp/ResourcesDetails";
import LibraryInfo from "./components/newMemberApp/LibraryInfo";
import ContactUs from "./components/newMemberApp/ContactUs";
import Receipt from "./components/newMemberApp/Receipt";
import About from "./components/newMemberApp/About";
import PayemntSuccess from "./components/newMemberApp/PayemntSuccess";
import PaymentFailed from "./components/newMemberApp/PaymentFailed";
import Terms from "./components/newMemberApp/Terms";
import Privacy_policy from "./components/newMemberApp/Privacy_policy";
import Desclaimer from "./components/newMemberApp/Desclaimer";
const App = () => {
    return (
        <Routes>
            <Route path="/*" name="Member Home" element={<MemberApp />} />
            <Route path="/hello" name="Hello Page" exact element={<Hello />} />

            <Route path="/terms" name="About Page" element={<Terms />} />
            <Route
                path="/privacy-policy"
                name="Privacy policy"
                element={<Privacy_policy />}
            />
            <Route
                path="/disclaimer"
                name="Desclaimer"
                element={<Desclaimer />}
            />

            <Route
                path="/eresources"
                name="resources"
                element={<Resources />}
            />
            {/* test */}

            <Route path="/about" name="About Page" element={<About />} />
            <Route path="/receipt/:id" name="Receipt" element={<Receipt />} />
            <Route path="/payment-success" name="Payment Success" element={<PayemntSuccess />} />
            <Route path="/payment-failed" name="Payment Failed" element={<PaymentFailed />} />

            <Route
                path="/how-it-works"
                name="About Library"
                element={<LibraryInfo />}
            />

            <Route
                path="/contact-us"
                name="Contact Page"
                element={<ContactUs />}
            />

            <Route
                path="/eresources-details/:id"
                name="resources"
                element={<ResourcesDetails />}
            />

            <Route path="/admin/*" name="Admin Home" element={<AdminApp />} />

            {/* <Route path="*" element={<Navigate replace to={"/"} />} /> */}
        </Routes>
    );
};

export default App;
