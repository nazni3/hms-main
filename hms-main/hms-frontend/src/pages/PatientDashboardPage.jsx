import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import API from "../api/axios";

function PatientDashboardPage() {

    const name = localStorage.getItem("name");

    const [myAppointments, setMyAppointments] = useState(0);
    const [upcomingVisits, setUpcomingVisits] = useState(0);
    const [assignedDoctor, setAssignedDoctor] = useState("-");

    useEffect(() => {
        fetchPatientStats();
    }, []);

    const fetchPatientStats = async () => {
        try {

            const response = await API.get("/appointments");

            const patientAppointments = response.data.filter(
                appointment => appointment.patientName === name
            );

        setMyAppointments(patientAppointments.length);

        const now = new Date();

        const upcoming = patientAppointments.filter(
            appointment =>
                appointment.status === "SCHEDULED" &&
                new Date(appointment.appointmentTime) > now
        );

        setUpcomingVisits(upcoming.length);

        if (patientAppointments.length > 0) {
            setAssignedDoctor(
                patientAppointments[0].doctorName
            );
        }

        } catch (error) {
            console.error("Error fetching patient stats", error);
        }
    };

    const cards = [
        {
            title: "Book Appointment",
            description: "Schedule a new appointment",
            path: "/book-appointment",
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            title: "My Appointments",
            description: "View appointment history",
            path: "/appointments",
            color: "bg-purple-500 hover:bg-purple-600"
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="mb-10">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Hi {name},
                    </h1>

                    <p className="text-xl text-gray-600 mt-2">
                        Welcome to MedicareHub Patient Dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            My Appointments
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {myAppointments}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            Upcoming Visits
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {upcomingVisits}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            Assigned Doctor
                        </h2>

                        <p className="text-xl font-bold mt-2">
                            {assignedDoctor}
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="transform hover:scale-105 transition duration-300"
                        >
                            <div className={`${card.color} text-white p-8 rounded-2xl shadow-lg`}>

                                <h2 className="text-3xl font-bold mb-4">
                                    {card.title}
                                </h2>

                                <p className="text-gray-100 mb-6">
                                    {card.description}
                                </p>

                                <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200">
                                    Open Module
                                </button>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </>
    );
}

export default PatientDashboardPage;