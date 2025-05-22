import React from "react";
import { useParams } from "react-router";

function BookDetails(props) {
  const { isModal, setIsModal, goTo } = props;
  const { book } = isModal;
  return (
    <>
      <div
        className="modal fade bd-example-modal-lg"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {book.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  setIsModal({
                    ...isModal,
                    book: [],
                    show: false,
                  })
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body pt-3">
              <div className="modal-container d-flex align-items-center justify-content-center flex-column">
                <div className="modal-img">
                  <img src={book.image_path} alt="book-image" width={300} />
                </div>
                <div className="modal-text-container d-flex flex-column ">
                  <div className="modal-text-item d-flex align-items-center">
                    <h5>ISBN :</h5>
                    <p>{book.isbn ? book.isbn : "NA"}</p>
                  </div>
                  <div
                    className="modal-text-item d-flex"
                    style={{ alignItems: "center" }}
                  >
                    <h5>Authors :</h5>
                    <p>
                      {book.authors
                        ? book.authors[0].first_name +
                          " " +
                          book.authors[0].last_name
                        : "NA"}
                    </p>
                  </div>
                  <div className="modal-text-item d-flex flex-column">
                    <h5>Description :</h5>
                    <p>{book.description ? book.description : "NA"}</p>
                  </div>
                  <div className="modal-text-item d-flex">
                    <h5>URL :</h5>
                    <a href={book.url ? book.url : "#"}>
                      {book.url ? book.url : "NA"}
                    </a>
                  </div>
                  <div className="modal-btn-group d-flex gap-3">
                    <button
                      data-dismiss="modal"
                      aria-label="Close"
                      className="btn btn-primary"
                      onClick={() => goTo("lms/login")}
                    >
                      FOR RENT
                    </button>
                    <button
                      data-dismiss="modal"
                      aria-label="Close"
                      className="btn btn-success"
                      onClick={() => goTo("lms/login")}
                    >
                      READ
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
