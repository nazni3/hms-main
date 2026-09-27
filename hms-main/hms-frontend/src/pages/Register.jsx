import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/bg2.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",

    // Doctor
    specialization: "",
    experience: "",

    // Patient
    age: "",
    gender: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = { ...form };

      if (payload.role === "DOCTOR") {
        payload.age = null;
        payload.gender = null;
      }

      if (payload.role === "PATIENT") {
        payload.specialization = null;
        payload.experience = null;
      }

      await API.post("/auth/register", payload);

      alert("Registration Successful");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full border p-2 mb-4 rounded"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="ADMIN">Admin</option>
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>

          {form.role === "PATIENT" && (
            <>
              <input
                type="number"
                placeholder="Age"
                className="w-full border p-2 mb-4 rounded"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-2 mb-4 rounded"
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value,
                  })
                }
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </>
          )}


          {form.role === "DOCTOR" && (
            <>
              <input
                type="text"
                placeholder="Specialization"
                className="w-full border p-2 mb-4 rounded"
                value={form.specialization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialization: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Experience (Years)"
                className="w-full border p-2 mb-4 rounded"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value,
                  })
                }
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Already have an account? </span>

          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}