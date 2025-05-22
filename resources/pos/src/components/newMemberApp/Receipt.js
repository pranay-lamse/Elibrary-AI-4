import React, { useEffect, useRef, useState } from "react";

import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button } from "reactstrap";
import {
    addContact,
    fetchContacts,
} from "../../member/store/actions/frontendContactAction";
import contactStatus from "./contactStatus.json";
import { getCurrentMember } from "../../shared/sharedMethod";
import {
    dateFormatter,
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import { toWords } from 'number-to-words';
function Receipt(props) {
    const [libraryName, setLibraryName] = useState(0);
    const [address, setAddress] = useState('');
    const [libraryNameString, setLibraryNameString] = useState('');
    const [optionsuggestions, setoptionsuggestions] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const origin = window.location.origin.toString();
        if (origin === "https://dindayalupadhyay.smartcitylibrary.com") {
            setLibraryName(111);
            setAddress('55, Manewada Rd, Bhoyar Layout, Balaji Nagar, Rameshwari, Nagpur, Maharashtra 440027');
            setLibraryNameString('Dindayal Upadhyay Digital Library');
        } else if (origin === "https://kundanlalgupta.smartcitylibrary.com") {
            setLibraryName(222);
            setAddress('43MR+R46, Great Nag Rd, Indira Nagar, Rambagh, Nagpur, Maharashtra 440003');
            setLibraryNameString('Kundanlal Gupta Digital Library');
        } else if (origin === "https://rashtramatakasturba.smartcitylibrary.com") {
            setLibraryName(333);
            setAddress('536G+W58, Near Tuta Bagicha & Gandhi Statue, Sadar, Nagpur, Maharashtra 440001');
            setLibraryNameString('Rashtramata Kasturba Digital Library');
        } else {
            setLibraryName(111);
            setAddress('55, Manewada Rd, Bhoyar Layout, Balaji Nagar, Rameshwari, Nagpur, Maharashtra 440027');
            setLibraryNameString('Dindayal Upadhyay Digital Library');
        }
    }, []);

    useEffect(() => {
        fetch(`${window.location.origin.toString()}/api/b1/transactions-without-token?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setoptionsuggestions(data.data);
                if (data.data) {
                    window.print();
                }
            });
    }, [id]);

    const styles = {
        body: {
            fontFamily: '"Times New Roman", Times, serif',
            margin: 0,
            padding: '20px',
            backgroundColor: '#f4f4f4',
        },
        receiptContainer: {
            maxWidth: '706px',
            margin: '0 auto',
            background: '#fff',
            padding: '20px',
            border: '1px solid #ddd',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
        receiptTable: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableCell: {
            padding: '10px',
            border: '1px solid #ddd',
            verticalAlign: 'top',
        },

        receiptHeader: {
            textAlign: 'center',
        },
        img: {
            maxWidth: '150px',
            height: 'auto',
        },
        h4: {
            margin: 0,
            fontSize: '24px',
            fontFamily: 'Poppins',
        },
        bold: {
            fontWeight: 'bold',
        },
        largeText: {
            fontSize: 'larger',
        },
        borderBottom: {
            borderBottom: '1px solid black',
        },
        textUppercase: {
            textTransform: 'uppercase',
        },
        textCenter: {
            textAlign: 'center',
        },
        textRight: {
            textAlign: 'right',
        },
        redText: {
            color: 'red',
        },
        '@media print': {
            body: {
                margin: '0',
                padding: '20px',
                backgroundColor: '#fff',
            },
            receiptContainer: {
                border: '2px solid #000',
            },

            body: {
                fontFamily: '"Times New Roman", Times, serif',
                margin: 0,
                padding: '20px',
                backgroundColor: '#f4f4f4',
            },
            receiptContainer: {
                maxWidth: '600px',
                margin: '0 auto',
                background: '#fff',
                padding: '20px',
                border: '1px solid #ddd',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            },
            receiptTable: {
                width: '100%',
                borderCollapse: 'collapse',
            },
            tableCell: {
                padding: '10px',
                border: '1px solid #ddd',
                verticalAlign: 'top',
            },
            receiptHeader: {
                textAlign: 'center',
            },
            img: {
                maxWidth: '150px',
                height: 'auto',
            },
            h2: {
                margin: 0,
                fontSize: '24px',
            },
            bold: {
                fontWeight: 'bold',
            },
            largeText: {
                fontSize: 'larger',
            },
            borderBottom: {
                borderBottom: '1px solid black',
            },
            textUppercase: {
                textTransform: 'uppercase',
            },
            textCenter: {
                textAlign: 'center',
            },
            textRight: {
                textAlign: 'right',
            },
            redText: {
                color: 'red',
            },
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.receiptContainer}>
                <table style={styles.receiptTable}>
                    <tbody>
                        <tr style={styles.receiptHeader}>
                            <td colSpan="2" style={styles.textCenter}>
                                <p style={{
                                    margin: '0px',
                                    fontWeight: 'bold',
                                    color: '#444',
                                    fontSize: '40px',
                                    paddingBottom: '10px',
                                    whiteSpace: 'nowrap'  // Prevent wrapping
                                }}>{libraryNameString}</p>
                                <p style={{
                                    fontSize: '8px',
                                    color: '#000',
                                    whiteSpace: 'nowrap'  // Prevent wrapping
                                }}>{address}</p>
                                <p style={{
                                    fontSize: '18px',
                                    color: '#000'
                                }}>Receipt</p>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                No.: <strong style={styles.redText}>{id}</strong>
                            </td>
                            <td style={{ ...styles.tableCell, ...styles.textCenter }}>
                                DATE: {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                    <>{r.created_at ? dateFormatter(r.created_at) : "N/A"} </>
                                )) : null}
                            </td>
                        </tr>
                        <tr>

                            <td colSpan="2" style={{ ...styles.tableCell }}>
                                Member Name:
                                <span style={{ ...styles.textUppercase, ...styles.bold }}> {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                    <>{r.member?.first_name ? r.member?.first_name : ""} {r.member?.last_name ? r.member?.last_name : ""} </>
                                )) : null}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ ...styles.tableCell, ...styles.textUppercase, ...styles.bold }}>Membership Details </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>





                                {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                    <>{r.subscription_plan?.name ? r.subscription_plan?.name : ""} ( {r.subscription_plan?.frequency == 1 ? 'Montly' : ''}
                                        {r.subscription_plan?.frequency == 2 ? 'Yearly' : ''}
                                        {r.subscription_plan?.frequency == 3 ? 'LifeTime' : ''})
                                        <li style={{
                                            listStyleType: "none",
                                        }}>


                                            Start Date:{" "}{optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                                <> {new Date(r?.start_date).toLocaleDateString('en-GB')}</>
                                            )) : null}   | End Date: {" "}
                                            {
                                                optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                                    r?.end_date === "3024-03-01 11:34:58"
                                                        ? "Lifetime Membership"
                                                        : new Date(r?.end_date).toLocaleDateString('en-GB')
                                                )) : null
                                            }
                                        </li>

                                        {r?.book_status ===
                                            "1" ? (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                }}
                                            >
                                                <i className="fa fa-check-circle fa-lg text-success" />{" "}

                                                <span for="book">
                                                    Access of Books Active
                                                    till{" "}
                                                    {r?.book_status_created_at
                                                        ? r?.book_status_created_at ===
                                                            "3024-03-01 11:34:58"
                                                            ? "LifeTime"
                                                            : dateFormatter(
                                                                r?.book_status_created_at
                                                            )
                                                        : ""}
                                                </span>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {r?.library_status ===
                                            "1" ? (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                }}
                                            >
                                                <i className="fa fa-check-circle fa-lg text-success" />{" "}

                                                <span for="book">
                                                    Library Access of Study Room Active
                                                    till{" "}
                                                    {r?.library_status_created_at
                                                        ? r?.library_status_created_at ===
                                                            "3024-03-01 11:34:58"
                                                            ? "LifeTime"
                                                            : dateFormatter(
                                                                r?.library_status_created_at
                                                            )
                                                        : ""}
                                                </span>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {r?.ebook_status ===
                                            "1" ? (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                }}
                                            >
                                                <i className="fa fa-check-circle fa-lg text-success" />{" "}

                                                <span for="book">
                                                    Access of E-Books Active
                                                    till{" "}
                                                    {r?.ebook_status_created_at
                                                        ? r?.ebook_status_created_at ===
                                                            "3024-03-01 11:34:58"
                                                            ? "LifeTime"
                                                            : dateFormatter(
                                                                r?.ebook_status_created_at
                                                            )
                                                        : ""}
                                                </span>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                    </>
                                )) : null}








                            </td>
                            {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                <td style={{ ...styles.tableCell, ...styles.textCenter }}>
                                    <li
                                        style={{
                                            listStyleType: "none",
                                        }}
                                    >


                                        <span for="book">
                                            &nbsp;

                                        </span>
                                    </li>
                                    <li
                                        style={{
                                            listStyleType: "none",
                                        }}
                                    >


                                        <span for="book">
                                            &nbsp;

                                        </span>
                                    </li>
                                    <li
                                        style={{
                                            listStyleType: "none",
                                        }}
                                    >


                                        <span for="book">

                                            {r?.book_status ===
                                                "1" ? "₹380" : <>&nbsp;</>}



                                        </span>
                                    </li>
                                    <li
                                        style={{
                                            listStyleType: "none",
                                        }}
                                    >


                                        <span for="book">
                                            {r?.library_status ===
                                                "1" ? "₹300" : <>&nbsp;</>}

                                        </span>
                                    </li>
                                    <li
                                        style={{
                                            listStyleType: "none",
                                        }}
                                    >


                                        <span for="book">

                                            {r?.ebook_status ===
                                                "1" ? "₹500" : <>&nbsp;</>}

                                        </span>
                                    </li>


                                </td>
                            )) : null}
                        </tr>


                        <tr>
                            <td style={styles.tableCell}>


                            </td>
                            <td style={{ ...styles.tableCell, ...styles.textCenter }}>
                                {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                    <>₹{r.amount ? r.amount : "N/A"} </>
                                )) : null}

                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ ...styles.tableCell, ...styles.textUppercase, ...styles.bold }}>Transaction Details </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                Transaction  Reference No.

                            </td>
                            <td style={{ ...styles.tableCell, ...styles.textCenter }}>
                                {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (
                                    <>{r.payment_response ? r.payment_response : "N/A"} </>
                                )) : null}

                            </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>
                                Payment Method

                            </td>
                            <td style={{ ...styles.tableCell, ...styles.textCenter }}>


                                {optionsuggestions.length !== 0 ? optionsuggestions.map((r) => (


                                    <>{r.payment_mode === 2 ? 'Offline' : "Online"}</>
                                )) : null}

                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ ...styles.tableCell }}>**This is a computer generated receipt.</td>


                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default connect(null, { addContact })(React.memo(Receipt));
