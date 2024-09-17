import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState(() => {
    return {
      name: "",
      businessName: "",
      gst: "",
      contact: "",
      office: "",
      floor: "",
      building: "",
      street: "",
      locality: "",
      district: "",
      state: "",
      pinCode: "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(() => {
      return {
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        "http://localhost:8000/api/v1/update-contact-details",
        { contactDetails },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-4/12 mx-auto">
      <form
        action=""
        className="w-full bg-gray-100 p-3 mt-12 rounded-md "
        onSubmit={handleSubmit}
      >
        <div className="mt-4">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="on"
            placeholder="Name"
            onChange={handleChange}
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
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="contact"
            name="contact"
            type="number"
            autoComplete="on"
            placeholder="Contact number"
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="gst"
            name="gst"
            type="text"
            autoComplete="on"
            placeholder="GST number"
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="office"
            name="office"
            type="text"
            autoComplete="on"
            placeholder="Office Number"
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="floor"
            name="floor"
            type="text"
            autoComplete="on"
            placeholder="Floor number"
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="building"
            name="building"
            type="text"
            autoComplete="on"
            placeholder="Building number or name"
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="street"
            name="street"
            type="text"
            autoComplete="on"
            placeholder="Street number or name"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            id="pinCode"
            name="pinCode"
            type="number"
            autoComplete="on"
            placeholder="Pincode"
            minLength={6}
            maxLength={6}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Contact Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
