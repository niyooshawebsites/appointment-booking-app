import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPasswordForm = () => {
  const { username } = useSelector((state) => state.service_Provider_Slice);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `http://localhost:8000/api/v1/reset-password/${email}`
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setEmail("");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      <p className="text-center text-gray-500 mt-5">
        <Link
          to={username != "abs" ? `/${username}/` : "/"}
          className="text-indigo-600"
        >
          Go back to home
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
