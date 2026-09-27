import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/bg1.jpg";
import { useState, useEffect } from "react";
import API from "../api/axios";

function AdminDashboardPage() {

    // const name = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const [doctorCount, setDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);


    const cards = [
        {
            title: "Doctors",
            description: "Manage doctors and specializations",
            path: "/doctors",
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            title: "Patients",
            description: "Manage patient records and details",
            path: "/patients",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            title: "Appointments",
            description: "Schedule and manage appointments",
            path: "/appointments",
            color: "bg-purple-500 hover:bg-purple-600"
        }
    ];


    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const doctors = await API.get("/doctors");
            const patients = await API.get("/patients");
            const appointments = await API.get("/appointments");

            setDoctorCount(doctors.data.length);
            setPatientCount(patients.data.length);
            setAppointmentCount(appointments.data.length);

        } catch (error) {
            console.error("Error fetching dashboard counts", error);
        }
    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">


                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Hi {name},
                    </h1>

                    <p className="text-xl text-gray-600 mt-2">
                        Welcome to MedicareHub Admin Dashboard
                    </p>

                </div>

                {/* Stats Section */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            No. of Doctors
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {doctorCount}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            No. of Patients
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {patientCount}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            Total Appoitments
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {appointmentCount}
                        </p>
                    </div>

                </div>

                {/* Navigation Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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

export default AdminDashboardPage;