import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const Sidebar = ({
  setShowHighlights,
  setShowAllUsers,
  setShowAppointments,
  setshowAppointmentDetails,
  setShowServices,
  setShowProfile,
  setShowAbout,
  showContact,
}) => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);

  return (
    <div className="w-2/12 bg-gray-800 text-white h-full p-4">
      <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
      <ul>
        {/* -------------------------------------------------------- */}

        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
          onClick={() => {
            setShowHighlights(true);
            setShowAllUsers(false);
            setShowAppointments(false);
            setshowAppointmentDetails(false);
            setShowServices(false);
            setShowAbout(false);
            showContact(false);
            setShowProfile(false);
          }}
        >
          Highlights
        </li>

        {role == 1 && isAdmin == true ? (
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
            onClick={() => {
              setShowHighlights(false);
              setShowAllUsers(true);
              setShowAppointments(false);
              setshowAppointmentDetails(false);
              setShowServices(false);
              setShowAbout(false);
              showContact(false);
              setShowProfile(false);
            }}
          >
            Users
          </li>
        ) : (
          <>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                setShowHighlights(false);
                setShowAllUsers(false);
                setShowAppointments(true);
                setshowAppointmentDetails(false);
                setShowServices(false);
                setShowProfile(false);
                setShowAbout(false);
                showContact(false);
              }}
            >
              Appointments
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                setShowHighlights(false);
                setShowAllUsers(false);
                setShowAppointments(false);
                setshowAppointmentDetails(false);
                setShowServices(true);
                setShowProfile(false);
                setShowAbout(false);
                showContact(false);
              }}
            >
              Services
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                setShowHighlights(false);
                setShowAllUsers(false);
                setShowAppointments(false);
                setshowAppointmentDetails(false);
                setShowServices(false);
                setShowProfile(false);
                setShowAbout(true);
                showContact(false);
              }}
            >
              About
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                setShowHighlights(false);
                setShowAllUsers(false);
                setShowAppointments(false);
                setshowAppointmentDetails(false);
                setShowServices(false);
                setShowProfile(false);
                setShowAbout(false);
                showContact(true);
              }}
            >
              Contact
            </li>
          </>
        )}

        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
          onClick={() => {
            setShowHighlights(false);
            setShowAllUsers(false);
            setShowAppointments(false);
            setshowAppointmentDetails(false);
            setShowServices(false);
            setShowAbout(false);
            showContact(false);
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
