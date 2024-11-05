import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import { FaUserCog } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
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

  // admin sidebar menu
  if (role == 1 && isAdmin) {
    return (
      <>
        {/* Tablet and Laptop Sidebar (md and up) */}
        <div className="hidden md:block w-2/12 bg-indigo-800 text-white h-auto p-4">
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

        {/* Mobile Sidebar (md:hidden) */}
        <div className="md:hidden">
          <div className="flex flex-col justify-start bg-indigo-800 h-auto">
            <button
              className="md:hidden p-1 text-whiterounded text-white"
              onClick={handleToggle}
            >
              <CgMenuGridR style={{ fontSize: "1.5rem" }} />
            </button>
          </div>

          {/* Overlay for mobile */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleToggle}
          ></div>

          {/* Mobile Sidebar */}
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
        </div>
      </>
    );
  }

  // doctor sidebar menu
  if (role == 1 && isAdmin == false) {
    return (
      <>
        {/* Tablet and Laptop Sidebar (md and up) */}
        <div className="hidden md:block w-2/12 bg-indigo-800 text-white h-auto p-4">
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
              <RxStar /> &nbsp; Highlights
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                    showInvoice: false,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <LuMenuSquare style={{ color: "white" }} /> &nbsp; Services
            </li>
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
                    showBookAppointment: false,
                    showLetterHead: false,
                    showInvoice: false,
                    showQaulifications: true,
                    showTimings: false,
                  })
                );
              }}
            >
              <RxBackpack style={{ color: "white" }} /> &nbsp; Qualifications
            </li>
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
                    showBookAppointment: false,
                    showLetterHead: false,
                    showInvoice: false,
                    showQaulifications: false,
                    showTimings: true,
                  })
                );
              }}
            >
              <RxClock style={{ color: "white" }} /> &nbsp; Timings
            </li>
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
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
                    showInvoice: false,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <CgWebsite style={{ color: "white" }} /> &nbsp; About
            </li>
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
                    showContact: true,
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
              <RxComponent1 style={{ color: "white" }} /> &nbsp; Contact
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

        {/* Mobile Sidebar (md:hidden) */}
        <div className="md:hidden" style={{ zIndex: 50 }}>
          <div className="flex flex-col justify-start bg-indigo-800 h-auto">
            <button
              className="md:hidden p-1 text-whiterounded text-white"
              onClick={handleToggle}
            >
              <CgMenuGridR style={{ fontSize: "1.5rem" }} />
            </button>
          </div>

          {/* Overlay for mobile */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleToggle}
          ></div>

          {/* Mobile Sidebar */}
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
                    showQaulifications: true,
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
        </div>
      </>
    );
  }

  // patient sidebar menu
  if (role == 0 && isAdmin == false) {
    return (
      <>
        {/* Tablet and Laptop Sidebar (md and up) */}
        <div className="hidden md:block w-2/12 bg-indigo-800 text-white h-auto p-4">
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

        {/* Mobile Sidebar (md:hidden) */}
        <div className="md:hidden">
          <div className="flex flex-col justify-start bg-indigo-800 h-auto">
            <button
              className="md:hidden p-1 text-whiterounded text-white"
              onClick={handleToggle}
            >
              <CgMenuGridR style={{ fontSize: "1.5rem" }} />
            </button>
          </div>

          {/* Overlay for mobile */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleToggle}
          ></div>

          {/* Mobile Sidebar */}
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
        </div>
      </>
    );
  }
};

export default Sidebar;
