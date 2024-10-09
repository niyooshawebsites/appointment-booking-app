import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";

const DisplayInfo = () => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
  const { allUsers } = useSelector((state) => state.users_Data_Slice);
  const { allAppointments } = useSelector(
    (state) => state.appointments_Data_Slice
  );
  const [searchUser, setSearchUser] = useState(() => "");
  const [searchAppointment, setSearchAppointment] = useState(() => "");
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/v1/delete-user/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("User deleted successfully");
          setUserDeleted((prevState) => !prevState);
        })
        .catch(toast.error("Deleation failed"));
    } catch (err) {
      console.log(err);
    }
  };

  const filterUsers = (e) => {
    setSearchUser(() => e.target.value);
  };

  const filterAppointments = (e) => {
    setSearchAppointment(() => e.target.value);
  };

  // get a particular appointment details
  const getAParticularAppointmentDetails = async (appointmentId) => {
    await axios
      .get(
        `http://localhost:8000/api/v1/get-a-particular-appointment-details/${appointmentId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.appointment);
        dispatch(
          appointmentSliceActions.appointmentDetails({
            service: res.data.appointment.service,
            date: res.data.appointment.date,
            time: res.data.appointment.time,
            firstName: res.data.appointment.firstName,
            lastName: res.data.appointment.lastName,
            email: res.data.appointment.email,
            contactNo: res.data.appointment.contactNo,
            age: res.data.appointment.age,
            gender: res.data.appointment.gender,
            address: res.data.appointment.address,
            city: res.data.appointment.city,
            state: res.data.appointment.state,
            pinCode: res.data.appointment.pinCode,
            paymentMethod: res.data.appointment.paymentMethod,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDetails = async (appointmentId) => {
    await getAParticularAppointmentDetails(appointmentId);

    dispatch(
      dashboardOptionsSliceActions.toggleDashboardOptions({
        showHighlights: false,
        showInfo: false,
        showServices: false,
        showProfile: false,
        showAbout: false,
        showContact: false,
        showAppointmentDetails: true,
        showBookAppointment: false,
      })
    );
  };

  // show admin info...
  if (role == 1 && isAdmin) {
    return allUsers.length > 0 ? (
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
              <th className="py-2 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers
              .filter(
                (user) =>
                  user.email.toLowerCase().includes(searchUser) ||
                  user.businessName.toLowerCase().includes(searchUser)
              )
              .map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">{user.username}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {user.businessName ? user.businessName : "N/A"}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{user.email}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {user.contact.length > 10 ? "N/A" : user.contact}
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
                    <td className="py-2 px-4 text-gray-700">
                      <Link
                        onClick={() => {
                          handleDelete(user._id);
                          dispatch(
                            usersDataSliceActions.getUsersData({
                              allUsers: null, // this value needs to be fixed
                            })
                          );
                        }}
                        className="text-red-500"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="w-6/12 py-5 mx-auto">
        <h1 className="text-center text-2xl">No data to display</h1>
      </div>
    );
  }

  // show service provider info
  if (role == 1 && isAdmin == false) {
    return allAppointments.length > 0 ? (
      <div className="mx-auto">
        <input
          type="text"
          autoComplete="on"
          value={searchAppointment}
          onChange={filterAppointments}
          placeholder="Search user using business name or email..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
        />

        <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">#</th>
              <th className="py-2 px-4 text-left text-gray-600">Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Age</th>
              <th className="py-2 px-4 text-left text-gray-600">Contact</th>
              <th className="py-2 px-4 text-left text-gray-600">Service</th>
              <th className="py-2 px-4 text-left text-gray-600">Date</th>
              <th className="py-2 px-4 text-left text-gray-600">Time</th>
              <th className="py-2 px-4 text-left text-gray-600">Gender</th>
              <th className="py-2 px-4 text-left text-gray-600">Payment</th>
              <th className="py-2 px-4 text-left text-gray-600">Details</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments
              .filter(
                (appointment) =>
                  appointment.firstName
                    .toLowerCase()
                    .includes(searchAppointment) ||
                  appointment.service.toLowerCase().includes(searchAppointment)
              )
              .map((appointment, index) => {
                return (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.firstName}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.age}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.contactNo}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.service}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.date.split("-").reverse().join("-")}
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
                        className="text-blue-500"
                        onClick={() => handleDetails(appointment._id)}
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
    ) : (
      <div className="w-6/12 py-5 mx-auto">
        <h1 className="text-center text-2xl">No data to display</h1>
      </div>
    );
  }

  if (role == 0 && isAdmin == false) {
    return allAppointments.length > 0 ? (
      <div className="mx-auto">
        <input
          type="text"
          autoComplete="on"
          value={searchAppointment}
          onChange={filterAppointments}
          placeholder="Search user using business name or email..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
        />

        <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
          <thead className="bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">#</th>
              <th className="py-2 px-4 text-left text-gray-600">Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Age</th>
              <th className="py-2 px-4 text-left text-gray-600">Contact</th>
              <th className="py-2 px-4 text-left text-gray-600">Service</th>
              <th className="py-2 px-4 text-left text-gray-600">Date</th>
              <th className="py-2 px-4 text-left text-gray-600">Time</th>
              <th className="py-2 px-4 text-left text-gray-600">Gender</th>
              <th className="py-2 px-4 text-left text-gray-600">Payment</th>
              <th className="py-2 px-4 text-left text-gray-600">Details</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments
              .filter(
                (appointment) =>
                  appointment.firstName
                    .toLowerCase()
                    .includes(searchAppointment) ||
                  appointment.service.toLowerCase().includes(searchAppointment)
              )
              .map((appointment, index) => {
                return (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.firstName}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.age}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.contactNo}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.service}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.date.split("-").reverse().join("-")}
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
                        className="text-blue-500"
                        onClick={() => handleDetails(appointment._id)}
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
    ) : (
      <div className="w-6/12 py-5 mx-auto">
        <h1 className="text-center text-2xl">No data to display</h1>
      </div>
    );
  }
};

export default DisplayInfo;
