import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState(() => {
    return {
      name: "",
      businessName: "",
      gst: "",
      contactNo: "",
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
    setContactDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/update-contact-details",
        contactDetails,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setContactDetails(() => {
          return {
            name: "",
            businessName: "",
            gst: "",
            contactNo: "",
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-10/12 md:w-8/12 mx-auto">
      <h2 className="mt-10 mb-4 text-center text-3xl text-pink-600">
        Contact Details
      </h2>
      <form className="w-full p-5 mt-2 rounded-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Column */}
          <div className="space-y-4">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="on"
                placeholder="Name"
                value={contactDetails.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="businessName"
                name="businessName"
                type="text"
                autoComplete="on"
                placeholder="Healthcare center name"
                value={contactDetails.businessName}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="contactNo"
                name="contactNo"
                type="text"
                autoComplete="on"
                placeholder="Contact number"
                value={contactDetails.contactNo}
                onChange={handleChange}
                minLength={10}
                maxLength={10}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="gst"
                name="gst"
                type="text"
                autoComplete="on"
                placeholder="GST number"
                value={contactDetails.gst}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="office"
                name="office"
                type="text"
                autoComplete="on"
                placeholder="Office Number"
                value={contactDetails.office}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="floor"
                name="floor"
                type="text"
                autoComplete="on"
                placeholder="Floor number"
                value={contactDetails.floor}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <div>
              <input
                id="building"
                name="building"
                type="text"
                autoComplete="on"
                placeholder="Building number or name"
                value={contactDetails.building}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="street"
                name="street"
                type="text"
                autoComplete="on"
                placeholder="Street number or name"
                value={contactDetails.street}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="locality"
                name="locality"
                type="text"
                autoComplete="on"
                placeholder="Locality"
                value={contactDetails.locality}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="district"
                name="district"
                type="text"
                autoComplete="on"
                placeholder="District"
                value={contactDetails.district}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="state"
                name="state"
                type="text"
                autoComplete="on"
                placeholder="State"
                value={contactDetails.state}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <input
                id="pinCode"
                name="pinCode"
                type="number"
                autoComplete="on"
                placeholder="Pincode"
                minLength={6}
                maxLength={6}
                value={contactDetails.pinCode}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-indigo-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Contact Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
