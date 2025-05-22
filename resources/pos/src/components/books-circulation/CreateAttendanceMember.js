import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardBody, Col, Row, Form, FormGroup, Label, Input, Table, Alert } from "reactstrap";
import PropTypes from "prop-types";
import "./BooksCirculation.scss";
import MasterLayout from "../MasterLayout";
import AnalogueClock from "react-analogue-clock";
const CreateAttendanceMember = () => {
    const [selectedMember, setSelectedMember] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("In");
    const [todayLogins, setTodayLogins] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [userId, setUserId] = useState(""); // New state for user ID
    const memberInputRef = useRef(null);

    const clockOptions = {
        useCustomTime: true,
        width: "300px",
        baseColor: "#3b73b9",
        borderColor: "#7bb216",
        borderWidth: 0,
        centerColor: "#7bb216",
        handColors: {
            hour: "#7bb216",
            minute: "#7bb216",
            second: "#FFFFFF"
        },
        notchColor: "#FFFFFF",
        numbersColor: "#FFFFFF",
        showNumbers: true,

        seconds: 1, // set your
        minutes: 10, // own
        hours: 22 // time here.
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter" && selectedMember) {
                onSubmitForm();
            }
        };
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [selectedMember]);

    useEffect(() => {
        fetchTodayLogins();
    }, [startDate, endDate, userId]); // Include userId dependency

    const fetchTodayLogins = () => {
        // Make a POST request including the selected start and end dates and user ID
        fetch("/attendance/today-logins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ start_date: startDate, end_date: endDate, user_id: userId }),
        })
            .then((response) => {
                if (response.status === 404) {
                    // If the response is 404, set todayLogins to an empty array
                    setTodayLogins([]);
                    throw new Error("No data found (404).");
                }
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Today's logins data:", data);
                setTodayLogins(data);
            })
            .catch((error) => {
                console.error("Error fetching today's logins:", error);
            });
    };


    const handleMemberChange = (e) => {
        setSelectedMember(e.target.value);
    };

    const handleStatusChange = (e) => {
        setAttendanceStatus(e.target.value);
    };

    const onSubmitForm = () => {
        const attendanceData = {
            member: selectedMember,
            status: attendanceStatus,
        };
        console.log("Attendance Data Submitted:", attendanceData);
        fetch("/submitAttendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendanceData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || "Error submitting attendance.");
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response from server:", data);
                setSelectedMember("");
                fetchTodayLogins();
                showAlert("Attendance submitted successfully!");
            })
            .catch((error) => {
                console.error("Error submitting attendance:", error);
                showAlert(error.message || "Error submitting attendance. Please try again.");
            });
    };

    const resetForm = () => {
        setSelectedMember("");
        setAttendanceStatus("In");
        setTodayLogins([]);
        setStartDate("");
        setEndDate("");
        setUserId("");
        setAlertMessage("");
        setAlertVisible(false);
        fetchTodayLogins();
        memberInputRef.current.focus(); // Optional: focus back on the member input
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleTimeString()}`;
    };

    const exportAttendanceLog = () => {
        const csvRows = [];
        csvRows.push(['Sr No.', 'User ID', 'In Time', 'Out Time', 'Date']);

        todayLogins.forEach((login, index) => {
            const row = [
                index + 1,
                `${login.first_name} ${login.last_name}`,
                formatDateTime(login.login_time),
                login.logout_time ? formatDateTime(login.logout_time) : 'N/A',
                new Date(login.login_time).toLocaleDateString(),
            ];
            csvRows.push(row);
        });

        const csvString = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'attendance_log.csv');
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <MasterLayout>
            <Row className="animated fadeIn" style={{ justifyContent: "center", marginTop: "20px" }}>
                <Col sm={12} md={6} className="mb-2">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AnalogueClock {...clockOptions} />
                    </div>
                </Col>
                <Col sm={12} md={6} className="mb-2">
                    <Card style={{ padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <CardBody>
                            {alertVisible && (
                                <Alert color="info" toggle={() => setAlertVisible(false)}>
                                    {alertMessage}
                                </Alert>
                            )}
                            <Form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                <FormGroup>
                                    <Label for="memberInput">Scan Member Barcode </Label>
                                    <Input
                                        type="text"
                                        name="member"
                                        id="memberInput"
                                        value={selectedMember}
                                        onChange={handleMemberChange}
                                        ref={memberInputRef}
                                        autoFocus
                                        required
                                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    />
                                </FormGroup>
                                <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                                    <Label for="statusSelect" style={{ marginBottom: "5px" }}>
                                        Attendance Status
                                    </Label>
                                    <Input
                                        type="select"
                                        name="status"
                                        id="statusSelect"
                                        value={attendanceStatus}
                                        onChange={handleStatusChange}
                                        required
                                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    >
                                        <option value="In">In</option>
                                        <option value="Out">Out</option>
                                    </Input>
                                </FormGroup>
                                <Button
                                    type="button"
                                    color="primary"
                                    onClick={onSubmitForm}
                                    style={{ padding: "10px", backgroundColor: "#007bff", borderRadius: "4px", border: "none", width: "100%" }}
                                >
                                    Submit Attendance
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={12} className="mb-2 p-4">
                    <Card style={{ padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <CardBody>
                            <h5>Attendance Logins</h5>
                            <FormGroup style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Label for="startDate">Start Date: </Label>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <Label for="endDate">End Date: </Label>
                                    <Input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                    <Button color="success" onClick={exportAttendanceLog}>
                                        Export Attendance Log
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Label for="userIdInput">User ID: </Label>
                                    <Input
                                        type="text"
                                        id="userIdInput"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Search by User ID"
                                    />
                                    <Button color="secondary" onClick={resetForm}>Reset</Button> {/* Reset Button */}
                                </div>
                            </FormGroup>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>User</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todayLogins.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No data found</td>
                                        </tr>
                                    ) : (
                                        todayLogins.map((login, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{login.first_name} {login.last_name}</td>
                                                <td>{formatDateTime(login.login_time)}</td>
                                                <td>{login.logout_time ? formatDateTime(login.logout_time) : "N/A"}</td>
                                                <td>{new Date(login.login_time).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </MasterLayout>
    );
};

CreateAttendanceMember.propTypes = {
    /*  title: PropTypes.string, */
};

export default CreateAttendanceMember;
