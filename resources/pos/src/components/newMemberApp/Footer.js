import React from "react";
const Footer = () => {
    return (
        <section
            className="contact-details sub-footer pt-4"
            id="contact-details-section"
        >
            <div className="container">
                <div className="row text-center text-md-left justify-content-around">
                    <div className="col-12 col-md-6 col-lg-3 ">
                        <img
                            src="images/elibrary.png"
                            alt=""
                            className="pb-2"
                            width={150}
                        />
                        {/* <div className="pt-2">
                            <p className=" m-0"> info@digitallibrary.com</p>
                            <p className=" m-0">
                                <a href="tel:+918981055565">+91898105556</a>
                            </p>
                        </div> */}
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 ">
                        <h5 className="pb-2">Our Guidelines</h5>
                        <a href="#/terms">
                            <p className="m-0 pb-2">Terms</p>
                        </a>
                        <a href="#/privacy-policy">
                            <p className="m-0 pt-1 pb-2">Privacy policy</p>
                        </a>
                        <a href="#/disclaimer">
                            <p className="m-0 pt-1 pb-2">Disclaimer</p>
                        </a>

                        <a href="#/how-it-works">
                            <p className="m-0 pb-2">How It Works</p>
                        </a>
                        {/* <a href="#">
                            <p className="m-0 pt-1 pb-2">Cookie Policy</p>
                        </a>
                        <a href="#">
                            <p className="m-0 pt-1">Discover</p>
                        </a> */}
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 ">
                        <h5 className="pb-2">Our address</h5>
                        <p className="">
                            Nagpur
                            <br />
                            Maharashtra
                        </p>
                        <div className="d-flex justify-content-center mx-auto">
                            <a href="#" target="_blank">
                                <span className="mdi mdi-facebook"></span>
                            </a>
                            <a href="#" target="_blank">
                                <span className="mdi mdi-twitter"></span>
                            </a>
                            {/* <a href="#">
                                <span className="mdi mdi-instagram"></span>
                            </a>
                            <a href="#">
                                <span className="mdi mdi-linkedin"></span>
                            </a> */}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 ">
                        <img
                            src="images/smartCity.png"
                            alt="smartcity-image"
                            style={{ width: "250px" }}
                        />
                    </div>
                </div>
                <div className="row text-center text-md-left justify-content-around pt-5">
                    <div className="px-4 col-md-4 col-sm-12">
                        <h5 className="pb-2">
                            राष्ट्रमाता कस्तुरबा वाचनालय ,सदर
                        </h5>
                        <p className="m-0">Incharge :- Manjushree Kanhere </p>
                        <p className="m-0 pb-2">
                            Contact no :
                            <a href="tel:+9422880817">+91 9422880817</a> ,
                            <a href="tel:+8007381362">+91 8007381362</a>
                        </p>
                    </div>
                    <div className="px-4 col-md-4 col-sm-12">
                        <h5 className="pb-2">
                            स्व. कुंदनलाल गुप्त वाचनालय,इमामवाडा
                        </h5>
                        <p className="m-0">Incharge :- Vijay Khobragade</p>
                        <p className="m-0 pb-2">
                            Contact no :
                            <a href="tel:+9194228092">+91 94228092</a> ,
                            <a href="tel:+919834467686">+91 9834467686</a>
                        </p>
                    </div>
                    <div className="px-4 col-md-4 col-sm-12">
                        <h5 className="pb-2">
                            पंडित दिनदयाल उपाध्याय वाचनालय,लक्ष्मीनगर
                        </h5>
                        <p className="m-0">Incharge :- Kailash Wandudhe </p>
                        <p className="m-0 pb-2">
                            Contact no :
                            <a href="tel:+9422880817">+91 9595511700</a>
                        </p>
                    </div>
                </div>
                <footer className="border-top">
                    <p className="text-center  pt-4">
                        © 2024
                        <a href="https://educron.com/" className="px-1">
                            Educron.
                        </a>
                        All rights reserved.
                    </p>
                </footer>
            </div>
        </section>
    );
};

export default React.memo(Footer);
