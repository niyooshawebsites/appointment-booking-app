import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import { FaUserCog } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import {
  RxClock,
  RxStar,
  RxComponent1,
  RxBackpack,
  RxBookmarkFilled,
} from "react-icons/rx";
import { useState } from "react";

/* eslint-disable react/prop-types */
const Sidebar = () => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
  const { username } = useSelector((state) => state.service_Provider_Slice);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (options) => {
    dispatch(dashboardOptionsSliceActions.toggleDashboardOptions(options));
  };

  // admin sidebar optoins
  if (role == 1 && isAdmin) {
    return (
      <div className="w-2/12 bg-indigo-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
          My Dashboard
        </h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                  showInvoice: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxStar style={{ color: "white" }} /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                  showInvoice: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }

  // Doctor sidebar options
  // if (role == 1 && isAdmin == false) {
  //   return (
  //     <div className="hidden md:block w-2/12 bg-indigo-800 text-white h-auto p-4">
  //       <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
  //         My Dashboard
  //       </h1>
  //       <ul>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: true,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: false,
  //                 showAbout: false,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <RxStar /> &nbsp; Highlights
  //         </li>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: true,
  //                 showProfile: false,
  //                 showAbout: false,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <LuMenuSquare style={{ color: "white" }} /> &nbsp; Services
  //         </li>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: false,
  //                 showAbout: false,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: true,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <RxBackpack style={{ color: "white" }} /> &nbsp; Qualifications
  //         </li>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: false,
  //                 showAbout: false,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: true,
  //               })
  //             );
  //           }}
  //         >
  //           <RxClock style={{ color: "white" }} /> &nbsp; Timings
  //         </li>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: false,
  //                 showAbout: true,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <CgWebsite style={{ color: "white" }} /> &nbsp; About
  //         </li>
  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: false,
  //                 showAbout: false,
  //                 showContact: true,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <RxComponent1 style={{ color: "white" }} /> &nbsp; Contact
  //         </li>

  //         <li
  //           className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
  //           onClick={() => {
  //             dispatch(
  //               dashboardOptionsSliceActions.toggleDashboardOptions({
  //                 showHighlights: false,
  //                 showInfo: false,
  //                 showServices: false,
  //                 showProfile: true,
  //                 showAbout: false,
  //                 showContact: false,
  //                 showAppointmentDetails: false,
  //                 showBookAppointment: false,
  //                 showLetterHead: false,
  //                 showInvoice: false,
  //                 showQaulifications: false,
  //                 showTimings: false,
  //               })
  //             );
  //           }}
  //         >
  //           <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }

  // off canvas menu for doctors
  if (role == 1 && isAdmin == false) {
    return (
      <>
        <button
          className="md:hidden p-2 text-white bg-indigo-800 rounded"
          onClick={handleToggle}
        >
          {isOpen ? "Close" : "Open"} Sidebar
        </button>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleToggle}
        ></div>

        <div
          className={`fixed top-0 left-0 w-64 h-full bg-indigo-800 text-white transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
            My Dashboard
          </h1>
          <ul>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: false,
                })
              }
            >
              <RxStar /> &nbsp; Highlights
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: true,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: false,
                })
              }
            >
              <LuMenuSquare style={{ color: "white" }} /> &nbsp; Services
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: true,
                  showTimings: false,
                })
              }
            >
              <RxBackpack style={{ color: "white" }} /> &nbsp; Qualifications
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: true,
                })
              }
            >
              <RxClock style={{ color: "white" }} /> &nbsp; Timings
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: true,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: false,
                })
              }
            >
              <CgWebsite style={{ color: "white" }} /> &nbsp; About
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: true,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: false,
                })
              }
            >
              <RxComponent1 style={{ color: "white" }} /> &nbsp; Contact
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() =>
                handleOptionClick({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showInvoice: false,
                  showQualifications: false,
                  showTimings: false,
                })
              }
            >
              <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
            </li>
          </ul>
        </div>
      </>
    );
  }

  // clients sidebar options
  if (role == 0 && isAdmin == false) {
    return (
      <div className="hidden md:block w-2/12 bg-indigo-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
          My Dashboard
        </h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                  showInvoice: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxStar style={{ color: "white" }} /> &nbsp; Highlights
          </li>

          {username == "abs" ? (
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                    loginBooking: false,
                    showInvoice: false,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <RxBookmarkFilled style={{ color: "white" }} /> &nbsp; Book
              Appointment
            </li>
          ) : (
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() => {
                dispatch(
                  appointmentSliceActions.appointmentDetails({
                    username,
                  })
                );

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
                    showInvoice: false,
                    loginBooking: true,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <RxBookmarkFilled style={{ color: "white" }} /> &nbsp; Book
              Appointment
            </li>
          )}

          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                  showInvoice: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }
};

export default Sidebar;
