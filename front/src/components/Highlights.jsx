import { useState, useEffect } from "react";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { appointmentsDataSliceActions } from "../store/slices/AppintmentsDataSlice";
import { paginationSliceActions } from "../store/slices/PaginationDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Highlights = () => {
  const [totalNumOfUsers, setTotalNumOfUsers] = useState(0);
  const [totalNumOfVerifiedUsers, setTotalNumOfVerifiedUsers] = useState(0);
  const [totalNumOfUnverifiedUsers, setTotalNumOfUnverifiedUsers] = useState(0);
  const [totalNumOfAppointments, setTotalNumOfApponintments] = useState(0);
  const [todayTotalNumOfUsers, setTodayTotalNumOfUsers] = useState(0);
  const [todayTotalNumOfVerifiedUsers, setTodayTotalNumOfVerifiedUsers] =
    useState(0);
  const [todayTotalNumOfUnverifiedUsers, setTodayTotalNumOfUnverifiedUsers] =
    useState(0);
  const [todayTotalNumOfAppointments, setTodayTotalNumOfApponintments] =
    useState(0);
  const [
    todayAppointmentCountsByUsername,
    setTodayAppointmentCountsByUsername,
  ] = useState(0);
  const [
    totalAppointmentsCountFilterByUsername,
    setTotalAppointmentsCountFilterByUsername,
  ] = useState(0);
  const [totalNumOfAppointmentsForClient, setTotalNumOfAppointmentsForClient] =
    useState(0);

  const { email, userId, role, isAdmin } = useSelector(
    (state) => state.user_Slice
  );

  const dispatch = useDispatch();

  // ADMIN APIS.....
  // get total number....
  const getTotalNumOfUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-total-users-count/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalNumOfUsers(res.data.totalUsersCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTotalNumOfVerifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-total-verified-users-count/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalNumOfVerifiedUsers(res.data.totalVerifiedUsersCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTotalNumOfUnverifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-total-unverified-users-count/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalNumOfUnverifiedUsers(res.data.totalUnverifiedUsersCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTotalNumOfAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-total-appointments-count",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalNumOfApponintments(res.data.totalAppointmentsCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // pass total number...
  const getAndPassAllUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-users/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAndPassAllVerifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-verified-users/${userId}/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all verified users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAndPassAllUnverifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-unverified-users/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all unverified users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // get today total number...
  const getTodayTotalNumOfUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-today-total-users-count",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodayTotalNumOfUsers(res.data.todayTotalUsersCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTodayTotalNumOfVerifiedUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-today-total-verified-users-count",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodayTotalNumOfVerifiedUsers(res.data.todayTotalVerifiedUsersCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTodayTotalNumOfUnverifiedUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-today-total-unverified-users-count",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodayTotalNumOfUnverifiedUsers(
          res.data.todayTotalUnverifiedUsersCount
        );
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTodayTotalNumOfApponintments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-today-total-appointments-count",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodayTotalNumOfApponintments(res.data.todayTotalAppointmentsCount);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // pass today number...
  const getAndPassTodayUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-today-users/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "today's all users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAndPassTodayVerifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-today-verified-users/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "today's all verified users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAndPassTodayUnverifiedUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-today-unverified-users/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "today's all unverified users",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          usersDataSliceActions.getUsersData({
            allUsers: res.data.users,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // USER APIS...
  const getTodayAppointmentsCountFilterByUsername = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/today-appointments-count/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodayAppointmentCountsByUsername(res.data.appointments);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTotalAppointmentsCountFilterByUsername = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-total-appointments-count/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalAppointmentsCountFilterByUsername(res.data.appointments);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // get and pass total-appointments-by-userId
  const getAndPassAllAppointmentsByUserId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-appointments-by-userId/${userId}/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all appointments for a specific user",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          appointmentsDataSliceActions.getAppointmentsData({
            allAppointments: res.data.appointments,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // get and pass today-appointments-by-userId
  const getAndPassTodaysAppointmentsByUserId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-today-appointments-by-userId/${userId}/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "today's all appointments for a specific user",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          appointmentsDataSliceActions.getAppointmentsData({
            allAppointments: res.data.appointments,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // CLIENT APIS...
  // get total appointments for a specific client
  const getTotalAppointmentssCountByUserIdForClient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-total-appointments-count-by-userId-for-client/${email}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalNumOfAppointmentsForClient(res.data.appointments);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAndAllPassApponitmentsForClient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-appointments-for-client/${email}/1`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all appointments for a specific client",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          appointmentsDataSliceActions.getAppointmentsData({
            allAppointments: res.data.appointments,
          })
        );

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: false,
            showInfo: true,
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
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (role === 1 && isAdmin === true) {
      // Admin specific function calls
      getTotalNumOfUsers();
      getTotalNumOfVerifiedUsers();
      getTotalNumOfUnverifiedUsers();
      getTotalNumOfAppointments();
      getTodayTotalNumOfUsers();
      getTodayTotalNumOfVerifiedUsers();
      getTodayTotalNumOfUnverifiedUsers();
      getTodayTotalNumOfApponintments();
    } else if (role === 1 && isAdmin === false) {
      // Service provider specific function calls
      getTodayAppointmentsCountFilterByUsername();
      getTotalAppointmentsCountFilterByUsername();
    } else if (role === 0 && isAdmin === false) {
      // Client specific function calls
      getTotalAppointmentssCountByUserIdForClient();
    }
  }, []);

  // show higlights for admin
  if (role == 1 && isAdmin) {
    return (
      <>
        <div className="w-full flex flex-col border">
          <h1 className="text-center text-3xl mt-10 text-pink-600">
            Highlights
          </h1>
          <div className="flex space-x-8 p-8 mx-auto w-6/12">
            {/* Column 1 */}
            <div className="w-1/2">
              <h2 className="text-xl text-center mb-4">All Data</h2>
              <table className="min-w-full bg-white border border-gray-200 shadow-md text-center">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="text-left py-2 px-4 border-b">
                      Service Providers
                    </th>
                    <th className="text-left py-2 px-4 border-b">Entries</th>
                    <th className="text-left py-2 px-4 border-b">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Total</td>
                    <td className="py-2 px-4 border-b">
                      {totalNumOfUsers < 10
                        ? `0${totalNumOfUsers}`
                        : totalNumOfUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassAllUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Verified</td>
                    <td className="py-2 px-4 border-b">
                      {totalNumOfVerifiedUsers < 10
                        ? `0${totalNumOfVerifiedUsers}`
                        : totalNumOfVerifiedUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassAllVerifiedUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Unverified</td>
                    <td className="py-2 px-4 border-b">
                      {totalNumOfUnverifiedUsers < 10
                        ? `0${totalNumOfUnverifiedUsers}`
                        : totalNumOfUnverifiedUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassAllUnverifiedUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">
                      Appointments
                    </td>
                    <td className="py-2 px-4 border-b">
                      {totalNumOfAppointments < 10
                        ? `0${totalNumOfAppointments}`
                        : totalNumOfAppointments}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link className="text-indigo-800">
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Column 2 */}
            <div className="w-1/2">
              <h2 className="text-xl text-center mb-4">Today's Data</h2>
              <table className="min-w-full bg-white border border-gray-200 shadow-md text-center">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="text-left py-2 px-4 border-b">
                      Service Providers
                    </th>
                    <th className="py-2 px-4 border-b">Entries</th>
                    <th className="py-2 px-4 border-b">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Total</td>
                    <td className="py-2 px-4 border-b">
                      {todayTotalNumOfUsers < 10
                        ? `0${todayTotalNumOfUsers}`
                        : todayTotalNumOfUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassTodayUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Verified</td>
                    <td className="py-2 px-4 border-b">
                      {todayTotalNumOfVerifiedUsers < 10
                        ? `0${todayTotalNumOfVerifiedUsers}`
                        : todayTotalNumOfVerifiedUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassTodayVerifiedUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">Unverified</td>
                    <td className="py-2 px-4 border-b">
                      {todayTotalNumOfUnverifiedUsers < 10
                        ? `0${todayTotalNumOfUnverifiedUsers}`
                        : todayTotalNumOfUnverifiedUsers}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndPassTodayUnverifiedUsers}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left py-2 px-4 border-b">
                      Appointments
                    </td>
                    <td className="py-2 px-4 border-b">
                      {todayTotalNumOfAppointments < 10
                        ? `0${todayTotalNumOfAppointments}`
                        : todayTotalNumOfAppointments}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link className="text-indigo-800">
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  // show highlights for service providers
  if (role == 1 && isAdmin == false) {
    return (
      <div className="w-full flex flex-col border">
        <h1 className="text-center text-3xl my-3 text-pink-500">Highlights</h1>
        <div className="flex space-x-8 p-8 mx-auto w-6/12">
          {/* Column 1 */}
          <div className="w-1/2">
            <h2 className="text-xl mb-4 text-center">All Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-center">Entries</th>
                  <th className="py-2 px-4 border-b text-center">View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {totalAppointmentsCountFilterByUsername < 10
                      ? `0${totalAppointmentsCountFilterByUsername}`
                      : totalAppointmentsCountFilterByUsername}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link
                      className="text-indigo-500"
                      onClick={getAndPassAllAppointmentsByUserId}
                    >
                      <TbListDetails />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2 */}
          <div className="w-1/2">
            <h2 className="text-xl mb-4 text-center">Today's Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="py-2 text-center px-4 border-b">Entries</th>
                  <th className="py-2 text-center px-4 border-b">View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">
                    {todayAppointmentCountsByUsername < 10
                      ? `0${todayAppointmentCountsByUsername}`
                      : todayAppointmentCountsByUsername}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      className="text-indigo-500"
                      onClick={getAndPassTodaysAppointmentsByUserId}
                    >
                      <TbListDetails />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // show highlights for clients
  if (role == 0 && isAdmin == false) {
    return (
      <>
        <div className="w-full flex flex-col border">
          <h1 className="text-center text-3xl my-3 text-pink-500">
            Highlights
          </h1>
          <div className="flex space-x-8 p-8 mx-auto w-6/12">
            {/* Column 1 */}
            <div className=" mx-auto">
              {/* <h2 className="text-xl font-bold mb-4">Total</h2> */}
              <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="py-2 text-left px-4 border-b">
                      Appointments
                    </th>
                    <th className="py-2 text-center px-4  border-b">Entries</th>
                    <th className="py-2 text-left px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Total</td>
                    <td className="py-2 px-4 border-b text-center">
                      {totalNumOfAppointmentsForClient < 10
                        ? `0${totalNumOfAppointmentsForClient}`
                        : totalNumOfAppointmentsForClient}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        className="text-indigo-800"
                        onClick={getAndAllPassApponitmentsForClient}
                      >
                        <TbListDetails />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Highlights;
