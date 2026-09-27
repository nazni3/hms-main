import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import DoctorPatientsPage from "./pages/DoctorPatientsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute>
                            <DoctorsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/book-appointment"
                    element={
                        <ProtectedRoute>
                            <BookAppointmentPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <PatientsPage />
                        </ProtectedRoute>
                    }

                />

                <Route
                    path="/doctor-patients"
                    element={
                        <ProtectedRoute>
                            <DoctorPatientsPage />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <AppointmentsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor-dashboard"
                    element={
                        <ProtectedRoute>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patient-dashboard"
                    element={
                        <ProtectedRoute>
                            <PatientDashboardPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;