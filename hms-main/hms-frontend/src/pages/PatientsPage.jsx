import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function PatientsPage() {

    const [patients, setPatients] = useState([]);
    const role = localStorage.getItem("role");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "MALE"
    });

    // Fetch patients
    const fetchPatients = async () => {

        try {

            const response = await API.get("/patients");

            setPatients(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to fetch patients");
        }
    };

    // Add patient
    const addPatient = async () => {

        try {

            await API.post("/patients", formData);

            alert("Patient added successfully");

            fetchPatients();

            setFormData({
                name: "",
                email: "",
                password: "",
                age: "",
                gender: "MALE"
            });

        } catch (error) {

            console.log(error);

            alert("Failed to add patient");
        }
    };

    // Delete patient
    const deletePatient = async (id) => {

        try {

            await API.delete(`/patients/${id}`);

            alert("Patient deleted successfully");

            fetchPatients();

        } catch (error) {

            console.log(error);

            alert("Failed to delete patient");
        }
    };

    useEffect(() => {

        fetchPatients();

    }, []);

    return (
        <>
            <Navbar />

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-5xl font-bold">
                {role === "DOCTOR"
                    ? "My Patients"
                    : "Patients Management"}
            </h1>

            {/* Form */}

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

                <h2 className="text-xl font-bold mb-4">
                    Add Patient
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
                        type="number"
                        placeholder="Age"
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                age: e.target.value
                            })
                        }
                    />

                    <select
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.gender}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                gender: e.target.value
                            })
                        }
                    >
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>

                </div>

                <button
                    onClick={addPatient}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Patient
                </button>

            </div>

            {/* Patients Table */}

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-3xl font-bold mb-6">
                    {role === "DOCTOR"
                        ? "My Patients"
                        : "All Patients"}
                </h2>

                <table className="w-full border text-center">

                    <thead>

                    <tr className="bg-gray-200">

                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Age</th>
                        <th className="p-2 border">Gender</th>
                        <th className="p-2 border">Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {patients.map((patient) => (

                        <tr key={patient.id}
                            className="hover:bg-gray-100 transition"
                        >

                            <td className="p-2 border">
                                {patient.id}
                            </td>

                            <td className="p-2 border">
                                {patient.name}
                            </td>

                            <td className="p-2 border">
                                {patient.email}
                            </td>

                            <td className="p-2 border">
                                {patient.age}
                            </td>

                            <td className="p-2 border">
                                {patient.gender}
                            </td>

                            <td className="p-2 border">

                                <button
                                    onClick={() => deletePatient(patient.id)}
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

export default PatientsPage;