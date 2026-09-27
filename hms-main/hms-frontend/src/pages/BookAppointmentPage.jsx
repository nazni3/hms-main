import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function BookAppointmentPage() {

    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        doctorId: "",
        appointmentTime: ""
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {

            const response = await API.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to fetch doctors");
        }
    };

    const createAppointment = async () => {

        try {

            const patientName = localStorage.getItem("name");

            const patientResponse = await API.get("/patients");

            const patient = patientResponse.data.find(
                p => p.name === patientName
            );

            if (!patient) {
                alert("Patient not found");
                return;
            }

            await API.post("/appointments", {
                patientId: patient.id,
                doctorId: Number(formData.doctorId),
                appointmentTime: formData.appointmentTime
            });

            alert("Appointment booked successfully");

            setFormData({
                doctorId: "",
                appointmentTime: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed to book appointment");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Book Appointment
                </h1>

                <div className="bg-white p-6 rounded-2xl shadow-lg">

                    <h2 className="text-xl font-bold mb-4">
                        Schedule Appointment
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <select
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.doctorId}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    doctorId: e.target.value
                                })
                            }
                        >
                            <option value="">
                                Select Doctor
                            </option>

                            {doctors.map((doctor) => (
                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >
                                    {doctor.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="datetime-local"
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.appointmentTime}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    appointmentTime: e.target.value
                                })
                            }
                        />

                    </div>

                    <button
                        onClick={createAppointment}
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Book Appointment
                    </button>

                </div>

            </div>
        </>
    );
}

export default BookAppointmentPage;