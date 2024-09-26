import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [allApppointments, setAllAppointments] = useState(() => []);
  const [searchAppointments, setSearchAppointments] = useState(() => "");

  const filterAppointments = (e) => {
    setSearchAppointments(() => {
      e.target.value.toLowerCase();
    });
  };

  const fetchAllAppointments = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-all-appointments", {
        withCredentials: true,
      })
      .then((res) => setAllAppointments(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div className="mx-auto">
      <input
        id="firstName"
        name="firstName"
        type="text"
        autoComplete="on"
        value={searchAppointments}
        onChange={filterAppointments}
        placeholder="Search Appointments using first name..."
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-5">
        <thead className="bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">#</th>
            <th className="py-2 px-4 text-left text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Age</th>
            <th className="py-2 px-4 text-left text-gray-600">Service</th>
            <th className="py-2 px-4 text-left text-gray-600">Date</th>
            <th className="py-2 px-4 text-left text-gray-600">Time</th>
            <th className="py-2 px-4 text-left text-gray-600">Gender</th>
            <th className="py-2 px-4 text-left text-gray-600">Payment</th>
            <th className="py-2 px-4 text-left text-gray-600">Details</th>
          </tr>
        </thead>
        <tbody>
          {allApppointments
            .filter((appointment) =>
              appointment.firstName.toLowerCase().includes(searchAppointments)
            )
            .map((appointment, index) => {
              return (
                <tr className="border-b border-gray-200" key={appointment._id}>
                  <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.firstName}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{appointment.age}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.service}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.date}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.time}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.gender}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {appointment.paymentMethod}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    <Link to="/more-details" className="text-blue-500">
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
