import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setShowAppointments, setShowProfile }) => {
  return (
    <div className="w-2/12 bg-gray-800 text-white h-full p-4">
      <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
      <ul>
        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
          onClick={() => {
            setShowAppointments(true);
            setShowProfile(true);
          }}
        >
          Appointments
        </li>
        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
          onClick={() => {
            setShowAppointments(false);
            setShowProfile(true);
          }}
        >
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
