import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { FcBookmark, FcFlashOn, FcContacts } from "react-icons/fc";
import { FaUserCog } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";

/* eslint-disable react/prop-types */
const Sidebar = () => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();

  // admin sidebar optoins
  if (role == 1 && isAdmin == true) {
    return (
      <div className="w-2/12 bg-gray-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FcFlashOn /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "teal" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }

  // service provider sidebar options
  if (role == 1 && isAdmin == false) {
    return (
      <div className="w-2/12 bg-gray-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FcFlashOn /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: true,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <LuMenuSquare style={{ color: "crimson" }} /> &nbsp; Services
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: true,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <CgWebsite style={{ color: "DarkOrange" }} /> &nbsp; About
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: true,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FcContacts /> &nbsp; Contact
          </li>

          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "teal" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }

  // clients sidebar options
  if (role == 0 && isAdmin == false) {
    return (
      <div className="w-2/12 bg-gray-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FcFlashOn /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: true,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FcBookmark /> &nbsp; Book Appointment
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-700 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "teal" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }
};

export default Sidebar;
