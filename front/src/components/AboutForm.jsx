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
    await axios
      .patch(
        "http://localhost:8000/api/v1/update-about-details",
        { about },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        toast("About details updated successfully");
        setAbout("");
      })
      .catch((err) => {
        console.log(err);
        toast("About details updation failed");
      });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen px-10">
      <div className="w-5/12 mx-auto">
        <h2 className="mt-4 mb-4 text-center text-2xl">Social Media Links</h2>
        <SocialForm />
      </div>

      <div className="w-7/12 max-w-screen-lg p-6 mx-auto rounded-lg">
        <h2 className="mt-4 mb-4 text-center text-2xl">About us Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              id="message"
              className="block w-full p-2 border border-gray-300 rounded-md  focus:border-gray-200"
              placeholder="Write your about us here..."
              value={about}
              onChange={handleChange}
              rows={10}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
