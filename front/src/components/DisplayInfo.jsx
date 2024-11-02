import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { changeApponitmentStatusSliceActions } from "../store/slices/ChangeAppointmentStatusSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import Pagination from "./Pagination";
import { FaPrint } from "react-icons/fa";
import { TbListDetails, TbReceiptRupee } from "react-icons/tb";
import {
  RxCheckCircled,
  RxCrossCircled,
  RxCross2,
  RxLink2,
} from "react-icons/rx";

const DisplayInfo = () => {
  const dispatch = useDispatch();
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
  const { allUsers } = useSelector((state) => state.users_Data_Slice);
  const { allAppointments } = useSelector(
    (state) => state.appointments_Data_Slice
  );
  const [userDeleted, setUserDeleted] = useState(false);
  const [searchUser, setSearchUser] = useState(() => "");
  const [searchAppointment, setSearchAppointment] = useState(() => "");
  const [appointmentsCountPerUser, setAppointmentsCountPerUser] = useState({});

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-user/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setUserDeleted((prevState) => !prevState);

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: allUsers.filter((singleUser) => singleUser._id != id),
          })
        );
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const filterUsers = (e) => {
    setSearchUser(() => e.target.value);
  };

  const filterAppointments = (e) => {
    setSearchAppointment(() => e.target.value.toUpperCase());
  };

  // get a particular appointment details
  const getAParticularAppointmentDetails = async (appointmentId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-a-particular-appointment-details/${appointmentId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          appointmentSliceActions.appointmentDetails({
            appointmentID: res.data.appointment.appointmentID,
            invoiceID: res.data.appointment.invoiceID,
            patientID: res.data.appointment.patientID,
            fee: res.data.appointment.fee,
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
          })
        );
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // get appointments count per user
  const fetchAppointmentsCount = async () => {
    try {
      const counts = {};

      // looping through allUsers
      for (const user of allUsers) {
        const res = await axios.get(
          `http://localhost:8000/api/v1/get-no-of-appointments-per-user/${user._id}`,
          {
            withCredentials: true,
          }
        );
        counts[user._id] = res.data.noOfAppointments;
      }

      setAppointmentsCountPerUser(counts);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
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
        showLetterHead: false,
        showInvoice: false,
        showQaulifications: false,
        showTimings: false,
      })
    );
  };

  const printLetterHead = async (appointmentId) => {
    await getAParticularAppointmentDetails(appointmentId);

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
        showLetterHead: true,
        showInvoice: false,
        showQaulifications: false,
        showTimings: false,
      })
    );
  };

  const printInvoice = async (appointmentId) => {
    await getAParticularAppointmentDetails(appointmentId);

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
        showInvoice: true,
        showQaulifications: false,
        showTimings: false,
      })
    );
  };

  const changeStatus = async (appId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/change-appointment-status/${appId}`,
        {
          appointmentStatus: "Accept",
          rejectReason: "",
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (role == 1 && isAdmin && allUsers.length > 0) {
      fetchAppointmentsCount();
    }
  }, [allUsers.length, userDeleted]);

  // show admin info...
  if (role == 1 && isAdmin) {
    return allUsers.length > 0 ? (
      <div className="mx-auto">
        <h1 className="mt-10 text-3xl text-center text-pink-600">Users</h1>
        <input
          type="text"
          autoComplete="on"
          value={searchUser}
          onChange={filterUsers}
          placeholder="Search user using business name or email..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
        />

        <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5 text-sm">
          <thead className="bg-pink-600 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-white">#</th>
              <th className="py-2 px-4 text-left text-white">Username</th>
              <th className="py-2 px-4 text-left text-white">B Name</th>
              <th className="py-2 px-4 text-left text-white">Email</th>
              <th className="py-2 px-4 text-left text-white">Contact</th>
              <th className="py-2 px-4 text-left text-white">DOJ</th>
              <th className="py-2 px-4 text-left text-white">Apps</th>
              <th className="py-2 px-4 text-left text-white">Verified</th>
              <th className="py-2 px-4 text-left text-white">Action</th>
              <th className="py-2 px-4 text-left text-white">Profile</th>
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
                  <tr key={user._id} className="odd:bg-gray-200 even:bg-white">
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">{user.username}</td>
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
                      {appointmentsCountPerUser[user._id] || 0}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {user.isVerified ? (
                        <span className="text-green-500">
                          <RxCheckCircled />
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <RxCrossCircled />
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      <button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        title="Delete"
                        className="text-red-500"
                      >
                        <RxCross2 />
                      </button>
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      <Link
                        to={`http://localhost:5173/${user.username}`}
                        target="_blank"
                        title="View Profile"
                        className="text-blue-500"
                      >
                        <RxLink2 />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination />
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
        <h1 className="mt-10 text-3xl text-center text-pink-600">
          Appointments
        </h1>
        <input
          type="text"
          autoComplete="on"
          value={searchAppointment}
          onChange={filterAppointments}
          placeholder="Search patients via Appointment ID or Patient ID or Patient name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
        />

        <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5 text-sm">
          <thead className="bg-pink-600 text-white border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">AID</th>
              <th className="py-2 px-4 text-left">PID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Contact</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Details</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
              <th className="py-2 px-4 text-left">Print</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments
              .filter(
                (appointment) =>
                  appointment.appointmentID
                    .toUpperCase()
                    .includes(searchAppointment) ||
                  appointment.patientID
                    .toUpperCase()
                    .includes(searchAppointment) ||
                  appointment.firstName
                    .toUpperCase()
                    .includes(searchAppointment)
              )
              .map((appointment, index) => {
                return (
                  <tr
                    key={appointment._id}
                    className="odd:bg-gray-200 even:bg-white"
                  >
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.appointmentID}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.patientID}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.firstName}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.contactNo}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.date.split("-").reverse().join("-")}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.time}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      <Link
                        className="text-indigo-800"
                        title="More details"
                        onClick={() => handleDetails(appointment._id)}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.appointmentStatus}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      <div className="flex flex-">
                        <button
                          className="bg-red-500 px-2 py-1 text-white rounded mr-2 hover:bg-red-600"
                          onClick={() => {
                            dispatch(
                              changeApponitmentStatusSliceActions.changeAppointmentStatus(
                                {
                                  appointmentId: appointment._id,
                                  appointmentStatus: true,
                                }
                              )
                            );
                          }}
                        >
                          Reject
                        </button>{" "}
                        <button
                          className="bg-green-500 px-2 py-1 text-white rounded hover:bg-green-600"
                          onClick={changeStatus(appointment._id)}
                        >
                          Accept
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-gray-700 flex">
                      <Link
                        className="text-slate-800 mr-4 text-lg"
                        title="Letterhead"
                        onClick={() => printLetterHead(appointment._id)}
                      >
                        <FaPrint />
                      </Link>
                      <Link
                        className="text-slate-800 text-xl"
                        title="Invoice"
                        onClick={() => printInvoice(appointment._id)}
                      >
                        <TbReceiptRupee />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination />
      </div>
    ) : (
      <div className="w-6/12 py-5 mx-auto">
        <h1 className="text-center text-2xl">No data to display</h1>
      </div>
    );
  }

  // show client info
  if (role == 0 && isAdmin == false) {
    return allAppointments.length > 0 ? (
      <div className="mx-auto">
        <h1 className="mt-10 text-3xl text-center text-pink-600">
          Appointments
        </h1>
        <input
          type="text"
          autoComplete="on"
          value={searchAppointment}
          onChange={filterAppointments}
          placeholder="Search user using business name or email..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 mt-5"
        />

        <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5 text-sm">
          <thead className="bg-pink-600 text-white border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">AID</th>
              <th className="py-2 px-4 text-left">Doctor</th>
              <th className="py-2 px-4 text-left">Clinic</th>
              <th className="py-2 px-4 text-left">Service</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Dr. Profile</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments
              .filter(
                (appointment) =>
                  appointment.appointmentID
                    .toLowerCase()
                    .includes(searchAppointment) ||
                  appointment.user.name
                    .toLowerCase()
                    .includes(searchAppointment) ||
                  appointment.user.businessName
                    .toLowerCase()
                    .includes(searchAppointment)
              )
              .map((appointment, index) => {
                return (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.appointmentID}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.user.name}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {appointment.user.businessName}
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
                      <Link
                        className="text-indigo-800"
                        to={`http://localhost:5173/${appointment.user.username}`}
                        title="View Profile"
                        target="_blank"
                      >
                        <RxLink2 />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination />
      </div>
    ) : (
      <div className="w-6/12 py-5 mx-auto">
        <h1 className="text-center text-2xl">No data to display</h1>
      </div>
    );
  }
};

export default DisplayInfo;
