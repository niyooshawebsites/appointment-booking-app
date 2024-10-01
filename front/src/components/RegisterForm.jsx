import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [registrationDetails, setRegistrationDetails] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/v1/register", registrationDetails)
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Nono no");
      });

    setRegistrationDetails(() => {
      return {
        username: "",
        email: "",
        password: "",
      };
    });
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Please login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
