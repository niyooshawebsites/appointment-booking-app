import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";

/* eslint-disable react/prop-types */
const Sidebar = () => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();

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
                showAllUsers: false,
                showAppointments: false,
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
          <li
            className="block py-2 px-4 hover:bg-gray-700 rounded link"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showAllUsers: true,
                  showAppointments: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                })
              );
            }}
          >
            Users
          </li>
        ) : (
          // show only for users
          <>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                dispatch(
                  dashboardOptionsSliceActions.toggleDashboardOptions({
                    showHighlights: false,
                    showAllUsers: false,
                    showAppointments: true,
                    showServices: false,
                    showProfile: false,
                    showAbout: false,
                    showContact: false,
                    showAppointmentDetails: false,
                  })
                );
              }}
            >
              Appointments
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded link"
              onClick={() => {
                dispatch(
                  dashboardOptionsSliceActions.toggleDashboardOptions({
                    showHighlights: false,
                    showAllUsers: false,
                    showAppointments: false,
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
                    showAllUsers: false,
                    showAppointments: false,
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
                    showAllUsers: false,
                    showAppointments: false,
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
                showAllUsers: false,
                showAppointments: false,
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
