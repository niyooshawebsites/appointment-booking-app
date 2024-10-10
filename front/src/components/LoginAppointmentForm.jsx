import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LoginAppointmentForm = ({ customerDashboard }) => {
  const [services, setServices] = useState([]);
  const { username } = useSelector((state) => state.appointment_Slice);
  const { userId } = useSelector((state) => state.user_Slice);

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
      serviceProvider: username,
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
    // api for booking appointment
    await axios
      .post(
        `http://localhost:8000/api/v1/book-appointment-by-login/${username}`,
        custDetails,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Appointment booked successfully!");
      })
      .catch((err) => {
        toast.error("Appointment booking failed!");
      });

    // udpating client details
    await axios
      .patch(
        `http://localhost:8000/api/v1/update-client-details/${userId}`,
        {
          firstName: custDetails.firstName,
          lastName: custDetails.lastName,
          email: custDetails.email,
          contactNo: custDetails.contactNo,
          age: custDetails.age,
          gender: custDetails.gender,
          address: custDetails.address,
          city: custDetails.city,
          state: custDetails.state,
          pinCode: custDetails.pinCode,
        },
        { withCredentials: true }
      )
      .then((res) => toast.success(res.data.msg))
      .catch((err) => toast.error("Appointment booking failed!"));

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
        serviceProvider: username,
      };
    });
  };

  // get all services by a particular username
  const getAllServicesByUsername = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/get-services/${username}`)
      .then((res) => setServices(res.data.services))
      .catch((err) => console.log(err));
  };

  // get all the data related to a particular client
  const getParticularClientDataByUserId = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/get-particular-client-data-by-userId/${userId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setCustDetails((prevDetails) => {
          return {
            ...prevDetails,
            firstName: res.data.user.firstName || "",
            lastName: res.data.user.lastName || "",
            email: res.data.user.email || "",
            contactNo: res.data.user.contactNo || "",
            age: res.data.user.age || "",
            gender: res.data.user.gender || "",
            address: res.data.user.address || "",
            city: res.data.user.city || "",
            state: res.data.user.state || "",
            pinCode: res.data.user.pinCode || "",
          };
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllServicesByUsername();
    getParticularClientDataByUserId();
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  const checkAvailability = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/check-appointment-availability?date=${custDetails.date}&time=${custDetails.time}&username=${username}`
      )
      .then((res) => alert(res.data.msg))
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="max-w-4xl mx-auto my-4 h-[600px] p-6 border rounded-lg shadow-md bg-white"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2 h-full flex flex-col justify-start">
        {/* Appointment Details */}
        {/* Appointment Details */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Appointment Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <select
                name="service"
                id="service"
                value={custDetails.service}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option value={service.serviceName} key={service.serviceId}>
                    {`${service.serviceName} - Rs${service.fee}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                id="date"
                name="date"
                type="date"
                min={currentDate}
                autoComplete="on"
                value={custDetails.date}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-center items-center">
              <label htmlFor="time" className="block mb-1 mr-2">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                min="09:00"
                max="18:00"
                value={custDetails.time}
                onChange={handleChange}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 "
                required
              />
            </div>
          </div>
        </div>
        <Link
          className="text-white text-center bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded w-full"
          onClick={checkAvailability}
        >
          Check Availability
        </Link>

        {/* Personal Details */}
        <div className="border-b border-t pb-4">
          <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="on"
                value={custDetails.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="on"
                value={custDetails.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="on"
                value={custDetails.email}
                onChange={handleChange}
                placeholder="Email"
                required
                readOnly
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
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
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
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
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                name="gender"
                id="gender"
                value={custDetails.gender}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-span-full">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="on"
                value={custDetails.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="on"
                value={custDetails.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <input
                id="state"
                name="state"
                type="text"
                autoComplete="on"
                value={custDetails.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
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
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <div>
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={custDetails.paymentMethod}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Select payment method">
                Select payment method
              </option>
              <option value="Pay locally" onClick={() => setPayOnline(false)}>
                Pay locally
              </option>
              <option value="Pay online" onClick={() => setPayOnline(true)}>
                Pay online
              </option>
            </select>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-x-4">
          <button type="button" className="text-sm font-semibold text-gray-700">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {payOnline ? "Pay & Book Appointment" : "Book Appointment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginAppointmentForm;
