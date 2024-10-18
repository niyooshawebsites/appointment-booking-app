import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Qualifications = () => {
  const [qualifications, setQualifications] = useState("");

  const handleChange = (e) => {
    setQualifications(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:8000/api/v1/update-user-qualifications`,
        { qualifications },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Qualifications updated successfully");
        setQualifications("");
      })
      .catch(() => toast.error("Qualifications updatedtion failed"));
  };

  return (
    <>
      <div className="w-8/12  mx-auto p-2">
        <h2 className="mt-10 mb-4 text-center text-3xl text-pink-600">
          Qualifications
        </h2>
        <form
          className="w-6/12 mx-auto p-3 mt-1 rounded-md"
          onSubmit={onSubmitHandler}
        >
          <div className="mt-4">
            <label htmlFor="qualifications" className="text-gray-400">
              Separate your qualifications with commas
            </label>
            <input
              name="qualifications"
              type="text"
              value={qualifications}
              onChange={handleChange}
              autoComplete="on"
              placeholder="Enter your qualifications..."
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-2"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Update Qualifications
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Qualifications;
