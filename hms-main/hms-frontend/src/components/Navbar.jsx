import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const dashboardPath =
        role === "ADMIN"
            ? "/admin-dashboard"
            : role === "DOCTOR"
            ? "/doctor-dashboard"
            : "/patient-dashboard";

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/");
    };

    return (

        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">

            {/* Portal Title */}
            <h1 className="text-2xl font-bold">
                {role === "ADMIN"
                    ? "Admin Portal"
                    : role === "DOCTOR"
                    ? "Doctor Portal"
                    : "Patient Portal"}
            </h1>

            {/* Navigation */}
            <div className="flex gap-6 items-center">

                <Link
                    to={dashboardPath}
                    className="hover:text-gray-300 transition"
                >
                    Dashboard
                </Link>

                {role === "ADMIN" && (
                    <>
                        <Link
                            to="/doctors"
                            className="hover:text-gray-300 transition"
                        >
                            Doctors
                        </Link>

                        <Link
                            to="/patients"
                            className="hover:text-gray-300 transition"
                        >
                            Patients
                        </Link>

                        <Link
                            to="/appointments"
                            className="hover:text-gray-300 transition"
                        >
                            Appointments
                        </Link>
                    </>
                )}

                {role === "DOCTOR" && (
                    <>
                        <Link
                            to="/doctor-patients"
                            className="hover:text-gray-300 transition"
                        >
                            My Patients
                        </Link>

                        <Link
                            to="/appointments"
                            className="hover:text-gray-300 transition"
                        >
                            Appointments
                        </Link>
                    </>
                )}

                {role === "PATIENT" && (
                    <Link
                        to="/appointments"
                        className="hover:text-gray-300 transition"
                    >
                        My Appointments
                    </Link>
                )}

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;