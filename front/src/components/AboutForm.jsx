import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        toast("Updation successful");
        setAbout("");
      })
      .catch((err) => {
        console.log(err);
        toast("Updation failed");
      });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-lg p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mt-4 mb-4 text-center text-2xl">About us Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea value={about} onChange={handleChange} rows={8}></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
