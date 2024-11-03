import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Unverified from "./Unverified";

const RegisterForm = () => {
  const { username, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showSpecialization, setShowSpecialization] = useState(true);

  const [registrationDetails, setRegistrationDetails] = useState(() => {
    return {
      role: 1,
      specialization: "N/A",
      username: "",
      email: "",
      password: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setShowSpecialization((prevState) => !prevState);
    }
    setRegistrationDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/register",
        registrationDetails
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }

      setRegistrationDetails(() => {
        return {
          role: 1,
          specialization: "N/A",
          username: "",
          email: "",
          password: "",
        };
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (!username) {
    // getting the username from url
    const path = window.location.pathname;
    let userName = path.split("/")[1];

    if (
      userName == "register" ||
      userName == "login" ||
      userName == "about" ||
      userName == "contact" ||
      userName == "verify-email" ||
      userName == "forgot-password" ||
      userName == "reset-password" ||
      userName == ""
    ) {
      userName = "abs";
    }

    return <Navigate to={userName != "abs" ? `/${userName}` : "/"} />;
  }

  if (!isVerified) {
    return <Unverified />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md my-5">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {username == "abs" ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Role
                </label>
                <select
                  name="role"
                  onChange={handleChange}
                  value={registrationDetails.role}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="1">Doctor</option>
                  <option value="0">Paitent</option>
                </select>
              </div>
              {showSpecialization ? (
                <div className="mb-4">
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Specialization
                  </label>
                  <select
                    name="specialization"
                    onChange={handleChange}
                    value={registrationDetails.specialization}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Endocrinologist">Endocrinologist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                    <option value="General Physician">General Physician</option>
                    <option value="Nephrologist">Nephrologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Orthopedist">Orthopedist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Psychologist">Psychologist</option>
                    <option value="Pulmonologist">Pulmonologist</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Rheumatologist">Rheumatologist</option>
                    <option value="Urologist">Urologist</option>
                  </select>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            ""
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registrationDetails.username}
              placeholder="The username must be unique and without spaces"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registrationDetails.email}
              placeholder="Email must be correct"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-6 ">
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center">
                <div className="w-11/12">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registrationDetails.password}
                    onChange={handleChange}
                    placeholder="Enter a strong password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="w-1/12 flex justify-center items-center text-gray-400">
                  <Link onClick={togglePassword} className="text-2xl">
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to={username != "abs" ? `/${username}/login` : "/login"}
            className="text-indigo-500"
          >
            Please login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
