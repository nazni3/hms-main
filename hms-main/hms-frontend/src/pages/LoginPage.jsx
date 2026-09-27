import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link} from "react-router-dom";
import bgImage from "../assets/bg2.jpg";



function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            }); 
            console.log(response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", email);
            console.log(response.data);

            alert("Login Successful");

            const role = response.data.role;

            localStorage.setItem("role", role);

            if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else if (role === "DOCTOR") {
                navigate("/doctor-dashboard");
            } else {
                navigate("/patient-dashboard");
            }

        } catch (error) {

            alert("Invalid Credentials");
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`
            }}
        >

            <div className="bg-white p-8 rounded shadow-md w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Medicare Hub 
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-4 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>

                <div className="text-center mt-4">
                    <span>Don't have an account? </span>
                    <Link
                        to="/register"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Register
                    </Link>
                </div>

            </div>

            
        </div>
    );
}

export default LoginPage;