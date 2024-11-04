import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SocialForm from "./SocialForm";

const AboutForm = () => {
  const [about, setAbout] = useState("");

  const handleChange = (e) => {
    const data = e.target.value;
    setAbout(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/update-about-details",
        { about },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setAbout("");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center min-h-screen px-10">
      <div className="w-full md:w-5/12 mx-auto md:h-52">
        <h2 className="mt-12 text-center text-3xl text-pink-600">
          Social Media Links
        </h2>
        <SocialForm />
      </div>

      <div className="w-full md:w-7/12 max-w-screen-lg p-6 mx-auto rounded-lg">
        <h2 className="mt-4 mb-4 text-center text-3xl text-pink-600">
          About us Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              id="message"
              className="block w-full p-2 border border-gray-300 rounded-md ring-2 ring-indigo-700 focus:border-gray-500"
              placeholder="Write your about us here..."
              value={about}
              onChange={handleChange}
              rows={15}
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-pink-600 text-white font-semibold rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Update details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
