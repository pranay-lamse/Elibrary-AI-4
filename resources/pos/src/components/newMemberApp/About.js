import React, { useEffect, useLayoutEffect, useState } from "react";
import ProgressBar from "../../shared/progress-bar/ProgressBar";

import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { fetchBooksAll } from "../../member/store/actions/bookAction";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

function About(props) {
    const { books, fetchBooksAll } = props;

    const [memberValue, setMemberValue] = useState(0);
    const [libraryName, setLibraryName] = useState(0);
    const [libraryVisterCount, setlibraryVisterCount] = useState(0);
    const [libraryBookCount, setlibraryBookCount] = useState(0);
    const [libraryNameOriginal, setlibraryNameOriginal] = useState("");

    useLayoutEffect(() => {
        fetchBooksAll();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    const position = [21.1313, 79.0922]; // Nagpur coordinates

    useEffect(() => {
        if (
            window.location.origin.toString() ==
            "https://dindayalupadhyay.smartcitylibrary.com"
        ) {
            setMemberValue(491);
            setLibraryName(111);
            setlibraryNameOriginal("Dindayal Upadhyay Digital Library");

            setlibraryVisterCount(12525);
            setlibraryBookCount(5454);
        } else if (
            window.location.origin.toString() ==
            "https://kundanlalgupta.smartcitylibrary.com"
        ) {
            setMemberValue(320);
            setLibraryName(222);
            setlibraryNameOriginal("Kundanlal Gupta Digital Library");
            setlibraryVisterCount(12554);
            setlibraryBookCount(5454);
        } else if (
            window.location.origin.toString() ==
            "https://rashtramatakasturba.smartcitylibrary.com"
        ) {
            setMemberValue(328);
            setLibraryName(333);
            setlibraryNameOriginal("Rashtramata Kasturba Digital Library");
            setlibraryVisterCount(12584);
            setlibraryBookCount(5454);
        } else {
            setMemberValue(450);
            setLibraryName(111);
            setlibraryNameOriginal("Dindayal Upadhyay Digital Library");
            setlibraryVisterCount(12535);
            setlibraryBookCount(5454);
        }
    }, []);

    return (
        <div className="content-wrapper">
            <ProgressBar />
            <Header />
            <section id="author" className="section-padding authorv2 ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
                            <div className="section-title-center text-center">
                                <span>ABOUT E-LIBRARY</span>
                                <h2 className="display-6">
                                    {libraryNameOriginal
                                        ? libraryNameOriginal
                                        : "Where Information Comes Alive"}
                                </h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        <div
                            className="col-lg-6 mb-4 mb-lg-0 aos-init"
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            <div className="authorv2__image">
                                <img
                                    className="img-fluid"
                                    src="public/uploads/images/achive.png"
                                    alt="Author"
                                />
                            </div>
                        </div>
                        <div
                            className="col-lg-6 aos-init"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            {libraryName === 111 ? (
                                <p>
                                    Welcome to the enchanting world of Pandit
                                    Deendayal Upadhyay Library, nestled within
                                    the heart of Ward No. 83 in the illustrious
                                    Nagpur Municipal Corporation. Here, amid the
                                    bustling streets of Paschim Nagpur, a
                                    sanctuary of knowledge was erected in 1978,
                                    fuelled by the fervent thirst for
                                    enlightenment within our educated community.
                                    <br />
                                    <br />
                                    Under the guiding hand of the esteemed
                                    Honorable Deputy Mayor, Shri Gangadhrao
                                    Fadnavis, this Library emerged as a beacon
                                    of intellectual nourishment, a haven where
                                    minds could wander freely through the vast
                                    realms of literature. For over two decades,
                                    we have remained steadfast in our commitment
                                    to serve our citizens, kindling and
                                    nurturing the flame of literacy in every
                                    soul we touch.
                                    <br />
                                    Since our inception, the Pandit Deendayal
                                    Upadhyay Library has embarked on an
                                    unwavering odyssey of progress, dedicated to
                                    meeting the ever-evolving needs of our
                                    beloved community. As we pave the way for
                                    the future, our vision expands to encompass
                                    a haven for all, with plans underway to
                                    introduce a children&#39;s sanctuary, a
                                    sanctuary for women, and a tranquil retreat
                                    for our esteemed senior citizens.
                                    <br />
                                    <br />
                                    With a treasury of 7,435 books and a
                                    fellowship of 945 avid readers, our library
                                    stands as a testament to our enduring
                                    commitment to enriching lives through
                                    literature. Over the years, we&#39;ve
                                    welcomed 5,916 eager minds into our fold,
                                    disseminating a staggering total of 3,77,893
                                    books and magazines, enriching the lives of
                                    approximately 1.6 million individuals since
                                    our inception.
                                    <br />
                                    <br />
                                    With great pride and foresight, we embraced
                                    this transformative journey into the realm
                                    of digital enlightenment. In the shimmering
                                    dawn of 2024, our library underwent a
                                    breathtaking metamorphosis, blossoming into
                                    an E-Library adorned with a dazzling
                                    Web-Portal. Once, where the air was thick
                                    with the hushed symphony of turning pages,
                                    now stand 30 computers, each a gateway to
                                    the boundless expanse of the digital cosmos.
                                    With broadband internet coursing through
                                    their veins, they stand as beacons,
                                    illuminating the path to knowledge and
                                    connectivity for all who enter our sacred
                                    halls.
                                    <br />
                                    <br />
                                    Our cherished collection of books underwent
                                    a digital metamorphosis, ushering in a new
                                    era of seamless access and management
                                    through cutting-edge digital technologies.
                                    <br />
                                    <br />
                                    Today, amidst the rustling pages and murmurs
                                    of thought, our library resonates with the
                                    vibrant spirit of West Nagpur, a testament
                                    to the enduring power of knowledge. We stand
                                    humbled by the profound response of our
                                    community, driven by a steadfast dedication
                                    to cultivate a culture of enlightenment and
                                    discovery within our beloved enclave.
                                    <br />
                                    <br />
                                </p>
                            ) : (
                                ""
                            )}

                            {libraryName === 222 ? (
                                <p>
                                    Step into the timeless realm of Kundanlal
                                    Gupta Library, a haven of wisdom and
                                    progress since its inception in 1980.
                                    Nestled amidst the vibrant landscape of
                                    South Nagpur, our journey began with a noble
                                    vision: to provide a gateway to knowledge
                                    for the promising yet underserved students
                                    of Imamwada and beyond. Over the decades,
                                    our commitment to this sacred mission has
                                    remained unwavering.
                                    <br />
                                    <br />
                                    Our doors stand open, a beacon of
                                    uninterrupted service, welcoming seekers of
                                    knowledge day and night. For we believe that
                                    a library should never be bound by the
                                    constraints of time or space but should
                                    instead serve as a sanctuary accessible to
                                    all, regardless of circumstance. The impact
                                    of Kundanlal Gupta Library on our community,
                                    particularly on the hearts and minds of avid
                                    readers and students, transcends mere words.
                                    <br />
                                    <br />
                                    With a treasury of 5,071 books, our library
                                    stands as a testament to our dedication to
                                    enriching minds. Welcoming over 6,000
                                    members since our inception, we have shared
                                    the transformative power of literature with
                                    over 1.5 million beneficiaries through the
                                    circulation of 75,436 books and magazines.
                                    Today, our shelves boast a diverse array of
                                    reading materials, including nine newspapers
                                    and six magazines, catering to the varied
                                    interests of our patrons.
                                    <br />
                                    <br />
                                    In the radiant dawn of 2024, our library
                                    embraced a transformative journey into the
                                    digital realm with pride and foresight. Like
                                    a butterfly emerging from its cocoon, we
                                    blossomed into an E-Library adorned with a
                                    dazzling Web-Portal. Amidst the hallowed
                                    halls, where once the melody of turning
                                    pages echoed, now stand 30 computers, each a
                                    portal to the infinite expanse of the
                                    digital universe. With broadband internet
                                    coursing through their veins, they serve as
                                    guiding lights, illuminating the path to
                                    knowledge and connectivity for all who tread
                                    within our sacred sanctuary.
                                    <br />
                                    <br />
                                    Our cherished collection underwent a digital
                                    metamorphosis, ushering in a new era of
                                    seamless access and management through
                                    cutting-edge technologies. True to our
                                    namesake, Kundanlal Gupta Library transcends
                                    the role of a mere repository of books; we
                                    are architects of an educational revolution,
                                    dedicated to shaping a brighter future
                                    through the boundless power of knowledge.
                                </p>
                            ) : (
                                ""
                            )}

                            {libraryName === 333 ? (
                                <p>
                                    In the annals of Nagpur Municipal
                                    Corporation&#39;s history, the genesis of
                                    our library dates back to the illustrious
                                    year of 1948. It began its journey under the
                                    humble moniker of Public Library, nestled
                                    within the embrace of our premises.
                                    <br />
                                    <br />
                                    Fast forward to the 19th of December 1954,
                                    and a significant union took place as
                                    Rashtramata Kasturba Hindi Library merged
                                    with our humble abode, christening it as
                                    Kasturba Library. At its helm stood Shri.
                                    Ambika Prasad Mishra, a luminary with an
                                    M.A. and Dip.Lib., serving as our inaugural
                                    librarian.
                                    <br />
                                    <br />
                                    From that pivotal moment, membership opened
                                    its doors to eager minds, marked by the
                                    historic enrollment of Shri. B.C. Kalaraiyya
                                    on the 11th of May 1994.
                                    <br />
                                    <br />
                                    The narrative took a significant turn on the
                                    19th of March 1965 when the Directorate of
                                    Libraries, Bombay, bestowed upon us the
                                    coveted &#39;B&#39; status, accompanied by
                                    the initiation of government subsidy. A
                                    subsequent decree on the 23rd of September
                                    1996 elevated our status to &#39;A&#39;,
                                    heralding an increase in government aid from
                                    Rs. 16,000 to a commendable Rs. 96,000. We
                                    stand proud as the sole recipient of such
                                    governmental patronage within Nagpur
                                    Mahanagar Palika&#39;s realm.
                                    <br />
                                    <br />
                                    Today, our library remains a sanctuary for
                                    500 to 600 avid readers, offering a treasure
                                    trove of literary gems. Amidst our shelves,
                                    one discovers a rich tapestry of Marathi and
                                    Hindi novels, stories, and literature,
                                    alongside an eclectic array of religious,
                                    medical, engineering, and sociopolitical
                                    tomes. With a collection boasting 20,877
                                    volumes, encompassing subjects spanning the
                                    breadth of human knowledge, our library
                                    stands as a bastion of enlightenment.
                                    <br />
                                    <br />
                                    In the luminous dawn of 2024, our library
                                    embarked on a transformative odyssey into
                                    the digital realm. Like a butterfly emerging
                                    from its chrysalis, we blossomed into an
                                    E-Library bedecked with a resplendent
                                    Web-Portal. Within our sacred confines,
                                    where once the rustle of pages filled the
                                    air, now stand 30 computers, each a gateway
                                    to the boundless expanse of the digital
                                    universe. With broadband internet coursing
                                    through their circuits, they illuminate the
                                    path to knowledge and connectivity for all
                                    who grace our hallowed halls.
                                    <br />
                                    <br />
                                    This digital evolution heralds a new era of
                                    seamless access and management, as our
                                    cherished collection undergoes a digital
                                    metamorphosis. United in our commitment to
                                    knowledge and innovation, we stand poised at
                                    the threshold of a future where the pursuit
                                    of enlightenment knows no bounds.
                                    <br />
                                    <br />
                                </p>
                            ) : (
                                ""
                            )}

                            <br />
                            {/*  <div className="authorv2__content">
                                <ul className="social-icon mt-3">
                                    <li>
                                        <a href="https://www.facebook.com">
                                            <img
                                                className="img-fluid"
                                                src="images/facebook.svg"
                                                alt="icon"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com">
                                            <img
                                                className="img-fluid"
                                                src="images/twitter.svg"
                                                alt="icon"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com">
                                            <img
                                                className="img-fluid"
                                                src="images/linkedin.svg"
                                                alt="icon"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com">
                                            <img
                                                className="img-fluid"
                                                src="images/youtube-play.svg"
                                                alt="icon"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.whatsapp.com">
                                            <img
                                                className="img-fluid"
                                                src="images/whatsapp.svg"
                                                alt="icon"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-padding counters ">
                <div className="promo-video">
                    {libraryName === 111 ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7443.811795131024!2d79.10055014467855!3d21.11631753065214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bfa37bef4379%3A0x6ace4c93682efe0a!2sPandit%20Dindayal%20Upadhyay%20E%20Library!5e0!3m2!1sen!2sin!4v1712730254607!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    ) : (
                        ""
                    )}

                    {libraryName === 222 ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.448473917882!2d79.08769577584332!3d21.134543484135733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0bcde8faca3%3A0x21e1e2f2438659c3!2sLate%20Kundanlalji%20Gupta%20Library!5e0!3m2!1sen!2sin!4v1712730047434!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    ) : (
                        ""
                    )}

                    {libraryName === 333 ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.7510471672495!2d79.07287087584392!3d21.16230348317734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0fcac07f693%3A0x205ad6c5d33409eb!2sCorporation%20Library%20And%20Kasturba%20Vachanalay!5e0!3m2!1sen!2sin!4v1712730332824!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    ) : (
                        ""
                    )}
                </div>
            </section>
            <section className="section-padding counters ">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
                            <div className="section-title-center text-center">
                                <span>AWESOME STATS</span>
                                <h2 className="display-6">
                                    ALL MILESTONES ACHIEVED
                                </h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="counters__stats m-0 p-0 d-flex flex-wrap align-items-center justify-content-center">
                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="100"
                                    className="aos-init"
                                >
                                    <div className="counters__stats-box h-100 translateEffect1">
                                        <div className="counters__stats-icon">
                                            <img
                                                className="img-fluid"
                                                src="images/page.svg"
                                                alt="icon"
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                        <div className="counters__stats-box__number">
                                            <span>
                                                {" "}
                                                {libraryBookCount
                                                    ? libraryBookCount
                                                    : ""}
                                                +
                                            </span>
                                        </div>
                                        <h5>Books</h5>
                                    </div>
                                </li>

                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="250"
                                    className="aos-init"
                                >
                                    <div className="counters__stats-box h-100 translateEffect1">
                                        <div className="counters__stats-icon">
                                            <img
                                                className="img-fluid"
                                                src="images/cart-alt.svg"
                                                alt="icon"
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                        <div className="counters__stats-box__number">
                                            <span>
                                                {" "}
                                                {libraryVisterCount
                                                    ? libraryVisterCount
                                                    : ""}
                                                +
                                            </span>
                                        </div>
                                        <h5>Total Views </h5>
                                    </div>
                                </li>
                                <li
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="300"
                                    className="aos-init"
                                >
                                    <div className="counters__stats-box h-100 translateEffect1">
                                        <div className="counters__stats-icon">
                                            <img
                                                className="img-fluid"
                                                src="images/award.svg"
                                                alt="icon"
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                        <div className="counters__stats-box__number">
                                            <span>{memberValue}</span>
                                        </div>
                                        <h5>Members</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { books } = state;
    return { books };
};

export default connect(
    mapStateToProps,
    { fetchBooksAll },
    null
)(React.memo(About));
