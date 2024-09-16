import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
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
    <div className="w-4/12 mx-auto">
      <form action="" className="w-full bg-gray-100 p-3 mt-12 rounded-md ">
        <div className="mt-4">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="on"
            placeholder="Name"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="on"
            placeholder="Business Name"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="officeNo"
            name="officeNo"
            type="text"
            autoComplete="on"
            placeholder="Office Number"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="buildingNo"
            name="buildingNo"
            type="text"
            autoComplete="on"
            placeholder="Building number"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="streetNo"
            name="streetNo"
            type="text"
            autoComplete="on"
            placeholder="Street number"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="locality"
            name="locality"
            type="text"
            autoComplete="on"
            placeholder="Locality"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="district"
            name="district"
            type="text"
            autoComplete="on"
            placeholder="District"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="on"
            placeholder="State"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="state"
            name="state"
            type="number"
            autoComplete="on"
            placeholder="Pincode"
            minLength={6}
            maxLength={6}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
