import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function DoctorsPage() {

    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: ""
    });

    // Fetch doctors
    const fetchDoctors = async () => {

        try {

            const response = await API.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to fetch doctors");
        }
    };

    // Add doctor
    const addDoctor = async () => {

        try {

            await API.post("/doctors", formData);

            alert("Doctor added successfully");

            fetchDoctors();

            setFormData({
                name: "",
                email: "",
                password: "",
                specialization: "",
                experience: ""
            });

        } catch (error) {
            console.log("Full Error:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            alert("Failed to add doctor");
        }
    };

    // Delete doctor
    const deleteDoctor = async (id) => {

        try {

            await API.delete(`/doctors/${id}`);

            alert("Doctor deleted successfully");

            fetchDoctors();

        } catch (error) {

            console.log(error);

            alert("Failed to delete doctor");
        }
    };

    useEffect(() => {

        fetchDoctors();

    }, []);

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Doctors Management
            </h1>

            {/* Form */}

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

                <h2 className="text-xl font-bold mb-4">
                    Add Doctor
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <input
                        type="text"
                        placeholder="Name"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Specialization"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.specialization}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                specialization: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Experience"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.experience}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                experience: e.target.value
                            })
                        }
                    />

                </div>

                <button
                    onClick={addDoctor}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Doctor
                </button>

            </div>

            {/* Doctors Table */}

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-xl font-bold mb-4">
                    All Doctors
                </h2>

                <table className="w-full border text-center">

                    <thead>

                    <tr className="bg-gray-200">

                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Specialization</th>
                        <th className="p-2 border">Experience</th>
                        <th className="p-2 border">Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {doctors.map((doctor) => (

                        <tr key={doctor.id}
                            className="hover:bg-gray-100 transition"
                        >

                            <td className="p-2 border">
                                {doctor.id}
                            </td>

                            <td className="p-2 border">
                                {doctor.name}
                            </td>

                            <td className="p-2 border">
                                {doctor.email}
                            </td>

                            <td className="p-2 border">
                                {doctor.specialization}
                            </td>

                            <td className="p-2 border">
                                {doctor.experience}
                            </td>

                            <td className="p-2 border">

                                <button
                                    onClick={() => deleteDoctor(doctor.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
        </>
    );
}

export default DoctorsPage;