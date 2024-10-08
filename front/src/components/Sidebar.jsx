import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
// import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
// import axios from "axios";

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
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Highlights
          </li>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Profile
          </li>
        </ul>
      </div>
    );
  }

  console.log(role);

  // service provider sidebar options
  if (role == 1 && isAdmin == false) {
    return (
      <div className="w-2/12 bg-gray-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
        <ul>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Highlights
          </li>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Services
          </li>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            About
          </li>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Contact
          </li>

          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Profile
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
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                })
              );
            }}
          >
            Highlights
          </li>
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                  showBookAppointment: true,
                })
              );
            }}
          >
            Book Appointment
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="w-2/12 bg-gray-800 text-white h-full p-4">
      <h1 className="text-xl font-semibold mb-6">My Dashboard</h1>
      <ul>
        {/*  Show highlights for  admins and users* */}
        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
              })
            );
          }}
        >
          Highlights
        </li>
        {role == 1 && isAdmin == true ? (
          // show only for admin
          <></>
        ) : (
          // show only for users
          <>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                  })
                );
              }}
            >
              Services
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                  })
                );
              }}
            >
              About
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
                  })
                );
              }}
            >
              Contact
            </li>
          </>
        )}
        {/* Show profile for  admins and users*/}
        <li
          className="block py-2 px-4 hover:bg-gray-700 rounded link"
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
              })
            );
          }}
        >
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
