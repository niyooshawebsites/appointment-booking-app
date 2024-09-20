/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { userSliceActions } from "../store/slices/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState(() => {
    return {
      username: "",
      password: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value.trim(),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/api/v1/login", loginDetails, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(
          userSliceActions.login({
            username: loginDetails.username,
          })
        );

        dispatch(
          userSliceActions.authentication({
            authenticated: res.data.success,
          })
        );
        toast("Login successful!");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast("Login failed!");
      });

    setLoginDetails(() => {
      return {
        username: "",
        password: "",
      };
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginDetails.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
