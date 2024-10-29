import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom"; // <-- Import useParams
import "./App.css"; 
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const developersData = [
    {
        name: "Swapnil Vhanale",
        tickets: [
            { id: 1, title: "Bug Fix", status: "assigned", date: "2024-10-27" },
            { id: 2, title: "Feature Request", status: "pending", date: "2024-10-28" },
            { id: 3, title: "API Integration", status: "assigned", date: "2024-10-25" },
            { id: 4, title: "Enhancement", status: "assigned", date: "2024-10-17" },
            { id: 5, title: "Task", status: "pending", date: "2024-10-26" },
        ],
    },
    {
        name: "Akshay Jagadale",
        tickets: [
            { id: 6, title: "UI Improvement", status: "assigned", date: "2024-10-27" },
            { id: 7, title: "Task", status: "assigned", date: "2024-10-28" },
            { id: 8, title: "Support", status: "pending", date: "2024-10-28" },
            { id: 9, title: "Bug", status: "pending", date: "2024-10-26" },
            { id: 10, title: "API Integration", status: "assigned", date: "2024-10-28" },
        ],
    },
    {
        name: "Santosh Divate",
        tickets: [
            { id: 11, title: "UI Improvement", status: "assigned", date: "2024-10-27" },
            { id: 12, title: "Bug: Notification System Fails", status: "assigned", date: "2024-10-28" },
            { id: 13, title: "Support: Help User Reset Password", status: "pending", date: "2024-10-27" },
            { id: 14, title: "Enhancement: Optimize Image Upload Process", status: "pending", date: "2024-10-28" },
            { id: 15, title: "API Integration", status: "assigned", date: "2024-10-26" },
        ],
    },
    {
        name: "Ajit Vandure",
        tickets: [
            { id: 16, title: "Database Migration", status: "pending", date: "2024-10-29" },
            { id: 17, title: "Bug: Incorrect Data Display in Dashboard", status: "assigned", date: "2024-10-28" },
            { id: 18, title: "Task: Review Code for Compliance", status: "pending", date: "2024-10-26" },
            { id: 19, title: "Enhancement: Improve Page Load Speed", status: "pending", date: "2024-10-27" },
        ],
    },
];

const HomePage = () => {
    return (
        <div className="container">
            <h1>Developer Ticket Tracker</h1>
            <div className="developer-list">
                {developersData.map((developer, index) => (
                    <Link to={`/developer/${index}`} key={index} className="developer">
                        <h3>{developer.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DeveloperTicketsPage = ({ developerIndex }) => {
    const developer = developersData[developerIndex];
    const [filterDate, setFilterDate] = useState("");

    const handleFilterChange = (event) => {
        setFilterDate(event.target.value);
    };

    const filteredTickets = developer.tickets.filter(ticket =>
        filterDate ? ticket.date === filterDate : true
    );

    return (
        <div className="container">
              <Link to="/">
                <button className="back">Back
                    {/* <FontAwesomeIcon icon="fa-solid fa-left-long" className="icon" /> */}
                </button>
            </Link>
         
            <h1>{developer.name}'s Tickets</h1>
            <div className="filter">
                <label htmlFor="dateFilter">Filter by Date:</label>
                <input
                    type="date"
                    id="dateFilter"
                    value={filterDate}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="ticket-list">
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                        <div key={ticket.id} className={`ticket ${ticket.status === "pending" ? "pending" : ""}`}>
                            <div>
                                {ticket.title}
                            </div>
                            <div>
                                <strong>Status:</strong> {ticket.status}
                                <span> (Date: {ticket.date})</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No tickets found for the selected date.</div>
                )}
                {filteredTickets.length > 0 && (
                    <div>
                        Total Tickets: {filteredTickets.length}
                    </div>
                )}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/developer/:id" element={<DeveloperTicketsPageWrapper />} />
            </Routes>
        </Router>
    );
}

const DeveloperTicketsPageWrapper = () => {
    const { id } = useParams(); 
    return <DeveloperTicketsPage developerIndex={parseInt(id)} />;
};

export default App;
