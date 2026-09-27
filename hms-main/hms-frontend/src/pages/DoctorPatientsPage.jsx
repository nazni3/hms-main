import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function DoctorPatientsPage() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {

        try {

            const doctorName = localStorage.getItem("name");

            const response = await API.get("/appointments");

            const myAppointments = response.data.filter(
                appointment => appointment.doctorName === doctorName
            );

            const uniquePatients = [
                ...new Map(
                    myAppointments.map(item => [
                        item.patientName,
                        item
                    ])
                ).values()
            ];

            setPatients(uniquePatients);

        } catch (error) {
            console.error("Error fetching patients", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <h1 className="text-5xl font-bold text-gray-800 mb-8">
                    My Patients
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-gray-500 text-sm">
                            Total Patients
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {patients.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-gray-500 text-sm">
                            Doctor
                        </h3>

                        <p className="text-2xl font-bold mt-2">
                            Dr. {localStorage.getItem("name")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-gray-500 text-sm">
                            Status
                        </h3>

                        <p className="text-2xl font-bold text-green-600 mt-2">
                            Active
                        </p>
                    </div>

                </div>

                {/* Patients Table */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Assigned Patients
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="bg-blue-600 text-white">

                                    <th className="p-4 text-left">
                                        Patient Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Appointment Time
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {patients.map((patient, index) => (

                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-4 font-medium">
                                            {patient.patientName}
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                patient.appointmentTime
                                            ).toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                {patient.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default DoctorPatientsPage;