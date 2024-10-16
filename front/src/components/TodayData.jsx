import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";

const TodayData = () => {
  const { username, role, isAdmin } = useSelector((state) => state.user_Slice);
  const [usersDetails, setUsersDetails] = useState(() => []);
  const [searchUser, setSearchUser] = useState(() => "");

  const [allApppointments, setAllAppointments] = useState(() => []);
  const [searchAppointments, setSearchAppointments] = useState(() => "");
  const dispatch = useDispatch();

  const getUsersDetails = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/get-today-users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUsersDetails(res.data.users);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllAppointments = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/get-today-appointments-by-username/${username}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setAllAppointments(res.data.appointments))
      .catch((err) => console.log(err));
  };

  // filter the users by search
  const filterUsers = (e) => {
    setSearchUser(() => e.target.value);
  };

  // filter the appointments by search
  const filterAppointments = (e) => {
    setSearchAppointments(() => e.target.value.toLowerCase());
  };

  // conditionally calling the useeffect on the basis of role and isAdmin
  useEffect(() => {
    role === 1 && isAdmin === true ? getUsersDetails() : fetchAllAppointments();
  }, []);

  return (
    <>
      {role === 1 && isAdmin === true ? (
        <div className="mx-auto">
          <input
            type="text"
            autoComplete="on"
            value={searchUser}
            onChange={filterUsers}
            placeholder="Search user using business name or email..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
          />

          <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">#</th>
                <th className="py-2 px-4 text-left text-gray-600">Username</th>
                <th className="py-2 px-4 text-left text-gray-600">B Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
                <th className="py-2 px-4 text-left text-gray-600">Contact</th>
                <th className="py-2 px-4 text-left text-gray-600">DOJ</th>
                <th className="py-2 px-4 text-left text-gray-600">Verified</th>
              </tr>
            </thead>
            <tbody>
              {usersDetails
                .filter(
                  (user) =>
                    user.email.toLowerCase().includes(searchUser) ||
                    user.businessName.toLowerCase().includes(searchUser)
                )
                .map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-2 px-4 text-gray-700">
                        {user.username}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {user.businessName ? user.businessName : "N/A"}
                      </td>
                      <td className="py-2 px-4 text-gray-700">{user.email}</td>
                      <td className="py-2 px-4 text-gray-700">
                        {user.contactNo.length > 10 ? "N/A" : user.contactNo}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {moment(user.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {user.isVerified ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mx-auto">
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="on"
            value={searchAppointments}
            onChange={filterAppointments}
            placeholder="Search Appointments using first name or service..."
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
                .filter(
                  (appointment) =>
                    appointment.firstName
                      .toLowerCase()
                      .includes(searchAppointments) ||
                    appointment.service
                      .toLowerCase()
                      .includes(searchAppointments)
                )
                .map((appointment, index) => {
                  return (
                    <tr
                      className="border-b border-gray-200"
                      key={appointment._id}
                    >
                      <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-2 px-4 text-gray-700">
                        {appointment.firstName}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        {appointment.age}
                      </td>
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
                        <Link
                          onClick={() => {
                            dispatch(
                              dashboardOptionsSliceActions.toggleDashboardOptions(
                                {
                                  showHighlights: false,
                                  showAllUsers: false,
                                  showAppointments: false,
                                  showServices: false,
                                  showProfile: false,
                                  showAbout: false,
                                  showContact: false,
                                  showAppointmentDetails: true,
                                  showBookAppointment: false,
                                  showLetterHead: false,
                                }
                              )
                            );

                            dispatch(
                              appointmentSliceActions.appointmentDetails({
                                service: appointment.service,
                                date: appointment.date,
                                time: appointment.time,
                                firstName: appointment.firstName,
                                lastName: appointment.lastName,
                                email: appointment.email,
                                contactNo: appointment.contactNo,
                                age: appointment.age,
                                gender: appointment.gender,
                                address: appointment.address,
                                city: appointment.city,
                                state: appointment.state,
                                pinCode: appointment.pinCode,
                                paymentMethod: appointment.paymentMethod,
                              })
                            );
                          }}
                          className="text-blue-500"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      ;
    </>
  );
};

export default TodayData;
