import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { findBooksWithout } from "../../member/store/actions/bookSearchAction";
import Header from "./Header";
import Footer from "./Footer";

const Staff = (props) => {
    const { books, goTo } = props;
    const handleDetails = (id, library_id, format) => {
        if (format && format === 3) {
            goTo("/ebook-details/" + id + "/" + library_id);
            window.scroll({ top: 0, behavior: "smooth" });
        } else {
            goTo(
                "/search/book&" +
                    name.replaceAll(" ", "") +
                    "/" +
                    id +
                    "/" +
                    library_id
            );
            window.scroll({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section className="case-studies">
            <div className="container">
                <div className="row grid-margin">
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Searched Results
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>
                    {books &&
                        books.reverse().map((book, i) => {
                            return (
                                <div
                                    key={i}
                                    className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                                    data-aos="zoom-in"
                                >
                                    <div className="card color-cards">
                                        <div className="card-body p-0">
                                            <div
                                                className="text-center card-contents"
                                                style={{
                                                    backgroundColor: "#f2f2f2",
                                                }}
                                                onClick={() =>
                                                    handleDetails(
                                                        book.id,
                                                        book.library_id,
                                                        book.items.length &&
                                                            book.items[0].format
                                                    )
                                                }
                                            >
                                                <div className="card-image">
                                                    <img
                                                        src={
                                                            book.image_path
                                                                ? book.image_path
                                                                : "https://cdn-icons-png.flaticon.com/512/3845/3845824.png"
                                                        }
                                                        className="case-studies-card-img"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="card-details text-center pt-4">
                                                    <h6 className="m-0 pb-1">
                                                        {book.name
                                                            ? book.name
                                                            : "NA"}
                                                    </h6>
                                                </div>

                                                <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                    <div
                                                        style={{
                                                            width: "fit-content",
                                                            padding: "auto 5px",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <span className="badge badge-info">
                                                                {book.items
                                                                    .length &&
                                                                book.items[0]
                                                                    .format ===
                                                                    3
                                                                    ? "E-Book"
                                                                    : "Book"}
                                                            </span>

                                                            {book?.library_id ===
                                                            111 ? (
                                                                <span className="badge badge-danger">
                                                                    Dindayal
                                                                    Upadhyay
                                                                    Library
                                                                </span>
                                                            ) : book?.library_id ===
                                                              222 ? (
                                                                <span className="badge badge-danger">
                                                                    Kundanlal
                                                                    Gupta
                                                                    Library
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-danger">
                                                                    Rashtramata
                                                                    Kasturba
                                                                    Library
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn btn-white frontend-btn"
                                                            onClick={() =>
                                                                handleDetails(
                                                                    book.id,
                                                                    book.library_id,
                                                                    book.items
                                                                        .length &&
                                                                        book
                                                                            .items[0]
                                                                            .format
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                Read More
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

function SearchCards(props) {
    const { newBookSearch } = props;
    const navigate = useNavigate();

    const staffOptions = {
        goTo: navigate,
        findBooksWithout,
        books: newBookSearch.toReversed().slice(0, 4),
    };
    return (
        <>
            <Header />
            <Staff {...staffOptions} />
            <Footer />
        </>
    );
}

const mapStateToProps = (state) => {
    const { newBookSearch } = state;
    return {
        newBookSearch,
    };
};

export default connect(mapStateToProps, null)(SearchCards);
