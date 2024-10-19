import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .get(`http://localhost:8000/api/v1/reset-password/${email}`)
        .then((res) => {
          toast.success(res.data.msg);
          setEmail("");
        })
        .catch((err) => {
          toast.error("Email not found!");
          setEmail("");
        });
    } catch (err) {
      console.log(err);
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
        <Link to="/" className="text-indigo-600">
          Go back to home
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
