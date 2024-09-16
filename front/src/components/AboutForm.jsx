import { useState } from "react";
import axios from "axios";

const AboutForm = () => {
  const [about, setAbout] = useState("");

  const handleChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "http://localhost:8000/api/v1/update-userdetails",
        { about },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-lg p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">About us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              id="about"
              name="about"
              value={about}
              onChange={handleChange}
              rows={15}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
