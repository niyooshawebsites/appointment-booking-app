import { Link } from "react-router-dom";

const Appointments = () => {
  return (
    <div className="mx-auto">
      <input
        id="firstName"
        name="firstName"
        type="text"
        autoComplete="on"
        placeholder="Search Appointments..."
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-5">
        <thead className="bg-gray-200 border-b border-gray-300">
          <tr>
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
          <tr className="border-b border-gray-200">
            <td className="py-2 px-4 text-gray-700">John Doe</td>
            <td className="py-2 px-4 text-gray-700">28</td>
            <td className="py-2 px-4 text-gray-700">Consulting</td>
            <td className="py-2 px-4 text-gray-700">2024-08-30</td>
            <td className="py-2 px-4 text-gray-700">10:00 AM</td>
            <td className="py-2 px-4 text-gray-700">Male</td>
            <td className="py-2 px-4 text-gray-700">$150.00</td>
            <td className="py-2 px-4 text-gray-700">
              <Link to="/more-details" className="text-blue-500">
                Details
              </Link>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 px-4 text-gray-700">Jane Smith</td>
            <td className="py-2 px-4 text-gray-700">32</td>
            <td className="py-2 px-4 text-gray-700">Therapy</td>
            <td className="py-2 px-4 text-gray-700">2024-08-31</td>
            <td className="py-2 px-4 text-gray-700">2:00 PM</td>
            <td className="py-2 px-4 text-gray-700">Female</td>
            <td className="py-2 px-4 text-gray-700">$200.00</td>
            <td className="py-2 px-4 text-gray-700">
              <Link to="/more-details" className="text-blue-500">
                Details
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
