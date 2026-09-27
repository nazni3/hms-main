import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import API from "../api/axios";

function DoctorDashboardPage() {

    const name = localStorage.getItem("name");

    const [myAppointments, setMyAppointments] = useState(0);
    const [todayAppointments, setTodayAppointments] = useState(0);
    const [assignedPatients, setAssignedPatients] = useState(0);

    useEffect(() => {
        fetchDoctorStats();
    }, []);

const fetchDoctorStats = async () => {
    try {

        const appointments = await API.get("/appointments");

        const doctorName = localStorage.getItem("name");

        // Only appointments for logged-in doctor
        const myDoctorAppointments = appointments.data.filter(
            appointment => appointment.doctorName === doctorName
        );

        console.log("Logged in doctor:", doctorName);
        console.log(
            "First Appointment:",
            appointments.data[0]
        );
        console.log("My Doctor Appointments:", myDoctorAppointments);
       

        
        // Today's appointments
        const today = new Date().toISOString().split("T")[0];
        console.log("Today:", today);
        myDoctorAppointments.forEach(a => {
            console.log("Appointment Time:", a.appointmentTime);
        });

        setMyAppointments(myDoctorAppointments.length);


        const todaysAppointments = myDoctorAppointments.filter(
            appointment =>
                appointment.appointmentTime?.startsWith(today)
        );

        console.log("Today's Appointments:", todaysAppointments);
        setTodayAppointments(todaysAppointments.length);

        // Unique patients assigned to doctor
        const uniquePatients = [
            ...new Set(
                myDoctorAppointments.map(
                    appointment => appointment.patientName
                )
            )
        ];

        setAssignedPatients(uniquePatients.length);

    } catch (error) {
        console.error("Error fetching doctor statistics", error);
    }
    

    
};

    const cards = [
        {
            title: "Patient List",
            description: "View assigned patients",
            path: "/doctor-patients",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            title: "Appointment Schedule",
            description: "Manage appointments",
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
                        Welcome to MedicareHub Doctor Dashboard
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
                            Today's Appointments
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {todayAppointments}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-gray-500 text-sm">
                            Assigned Patients
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {assignedPatients}
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

export default DoctorDashboardPage;