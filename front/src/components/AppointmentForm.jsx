import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const AppointmentForm = ({ serviceProvider, customerDashboard }) => {
  const path = window.location.pathname;
  let username = path.split("/")[1];

  const { services } = useSelector((state) => state.service_Provider_Slice);

  const [custDetails, setCustDetails] = useState(() => {
    return {
      service: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      age: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      paymentMethod: "",
      serviceProvider,
    };
  });

  const [payOnline, setPayOnline] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    await axios
      .post(
        `http://localhost:8000/api/v1/book-appointment/${username}`,
        custDetails
      )
      .then((res) => {
        toast.success("Appointment booked successfully!");
      })
      .catch((err) => {
        toast.error("Appointment booking failed!");
      });

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        service: "",
        date: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        age: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        paymentMethod: "",
        spUsername: username || "",
      };
    });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  // if the client is logged in
  if (customerDashboard) {
    return (
      <>
        <div className="mx-auto">
          <label
            htmlFor="specialization"
            className="block text-sm font-medium text-gray-700 mt-3"
          >
            Select Specialization
          </label>
          <select
            name="specialization"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="General Physician">General Physician</option>
            <option value="Nephrologist">Nephrologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Orthopedist">Orthopedist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Psychologist">Psychologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Rheumatologist">Rheumatologist</option>
            <option value="Urologist">Urologist</option>
          </select>

          <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">#</th>
                <th className="py-2 px-4 text-left text-gray-600">DR. Name</th>
                <th className="py-2 px-4 text-left text-gray-600">
                  Clinic Name
                </th>
                <th className="py-2 px-4 text-left text-gray-600">Contact</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
                <td className="py-2 px-4 text-left text-gray-600">Rating</td>
                <th className="py-2 px-4 text-left text-gray-600">Webiste</th>
                <th className="py-2 px-4 text-left text-gray-600">Book</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 text-left text-gray-600">#</td>
                <td className="py-2 px-4 text-left text-gray-600">DR. Name</td>
                <td className="py-2 px-4 text-left text-gray-600">
                  Clinic Name
                </td>
                <td className="py-2 px-4 text-left text-gray-600">Contact</td>
                <td className="py-2 px-4 text-left text-gray-600">Email</td>
                <td className="py-2 px-4 text-left text-gray-600">Rating</td>
                <td className="py-2 px-4 text-left text-gray-600">
                  <Link
                    className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded"
                    to={`http://localhost:5173/${username}`}
                    target="_blank"
                  >
                    Website
                  </Link>
                </td>
                <td className="py-2 px-4 text-left text-gray-600">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    Book
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // if the client is not logged in
  if (!customerDashboard) {
    return (
      <form className="w-9/12 mx-auto mb-10" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <h1 className="text-center text-4xl mt-5">Book Appointment</h1>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Appintment Details
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2">
                  <select
                    name="service"
                    id="service"
                    value={custDetails.service}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  >
                    <option value="No slection">Select service</option>
                    {services.map((service) => {
                      return (
                        <option
                          value={service.serviceName}
                          key={service.serviceId}
                        >
                          {`${service.serviceName} - Rs${service.fee}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={currentDate}
                    autoComplete="on"
                    value={custDetails.date}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="time"
                    id="time"
                    value={custDetails.time}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  >
                    <option value="No slection">Select time slot</option>
                    <option value="10 AM">10 AM</option>
                    <option value="11 AM">11 AM</option>
                    <option value="12 AM">12 AM</option>
                    <option value="01 PM">01 PM</option>
                    <option value="02 PM">02 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Details
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="on"
                    value={custDetails.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="on"
                    value={custDetails.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="on"
                    value={custDetails.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="number"
                    minLength={10}
                    maxLength={10}
                    autoComplete="on"
                    value={custDetails.contactNo}
                    onChange={handleChange}
                    placeholder="Contact number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min={1}
                    autoComplete="on"
                    value={custDetails.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="gender"
                    id="gender"
                    value={custDetails.gender}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  >
                    <option value="No selection">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="on"
                    value={custDetails.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="on"
                    value={custDetails.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="on"
                    value={custDetails.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <input
                    id="pinCode"
                    name="pinCode"
                    type="number"
                    minLength={6}
                    maxLength={6}
                    autoComplete="on"
                    value={custDetails.pinCode}
                    onChange={handleChange}
                    placeholder="Pin code"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Payment Details
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2">
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    value={custDetails.paymentMethod}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  >
                    <option value="No slection">Select payment method</option>
                    <option
                      value="Pay locally"
                      onClick={() => setPayOnline(false)}
                    >
                      Pay locally
                    </option>
                    <option
                      value="Pay online"
                      onClick={() => setPayOnline(true)}
                    >
                      Pay online
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {payOnline ? (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pay & Book Appointment
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Book Appointment
            </button>
          )}
        </div>
      </form>
    );
  }
};

export default AppointmentForm;
