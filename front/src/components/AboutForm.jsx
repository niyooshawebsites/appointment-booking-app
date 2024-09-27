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
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 px-10">
      <div className="w-5/12 mx-auto">
        <h2 className="mt-4 mb-4 text-center text-2xl">Social Media Links</h2>
        <form action="" className="w-full bg-gray-100 p-3 mt-1 rounded-md ">
          <div className="mt-4">
            <label htmlFor="facebook">Facebook URL</label>
            <input
              name="username"
              type="text"
              autoComplete="on"
              placeholder="https://facebook.com/#"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="facebook">Twitter URL</label>
            <input
              name="twitter"
              type="text"
              autoComplete="on"
              placeholder="https://x.com/#"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="facebook">Instagram URL</label>
            <input
              type="text"
              autoComplete="on"
              placeholder="https://instagram.com/#"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="facebook">LinkedIn URL</label>
            <input
              type="text"
              autoComplete="on"
              placeholder="https://instagram.com/#"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="facebook">Youtube URL</label>
            <input
              type="text"
              autoComplete="on"
              placeholder="https://youtube.com/#"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Links
            </button>
          </div>
        </form>
      </div>

      <div className="w-7/12 max-w-screen-lg p-6 mx-auto bg-white rounded-lg shadow-md">
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
