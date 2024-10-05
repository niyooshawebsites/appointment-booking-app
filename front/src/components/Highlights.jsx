import { useState, useEffect } from "react";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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

  const { userId, role, isAdmin } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();

  // ADMIN APIS.....
  const getTotalNumOfUsers = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/get-total-users-count/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setTotalNumOfUsers(res.data.totalUsersCount))
      .catch((err) => console.log(err));
  };

  const getTotalNumOfVerifiedUsers = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/get-total-verified-users-count/${userId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        setTotalNumOfVerifiedUsers(res.data.totalVerifiedUsersCount)
      )
      .catch((err) => console.log(err));
  };

  const getTotalNumOfUnverifiedUsers = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/get-total-unverified-users-count/${userId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        setTotalNumOfUnverifiedUsers(res.data.totalUnverifiedUsersCount)
      )
      .catch((err) => console.log(err));
  };

  const getTotalNumOfAppointments = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-total-appointments-count", {
        withCredentials: true,
      })
      .then((res) =>
        setTotalNumOfApponintments(res.data.totalAppointmentsCount)
      )
      .catch((err) => console.log(err));
  };

  const getTodayTotalNumOfUsers = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-today-total-users-count", {
        withCredentials: true,
      })
      .then((res) => setTodayTotalNumOfUsers(res.data.todayTotalUsersCount))
      .catch((err) => console.log(err));
  };

  const getTodayTotalNumOfVerifiedUsers = async () => {
    await axios
      .get(
        "http://localhost:8000/api/v1/get-today-total-verified-users-count",
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        setTodayTotalNumOfVerifiedUsers(res.data.todayTotalVerifiedUsersCount)
      )
      .catch((err) => console.log(err));
  };

  const getTodayTotalNumOfUnverifiedUsers = async () => {
    await axios
      .get(
        "http://localhost:8000/api/v1/get-today-total-unverified-users-count",
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        setTodayTotalNumOfUnverifiedUsers(
          res.data.todayTotalUnverifiedUsersCount
        )
      )
      .catch((err) => console.log(err));
  };

  const getTodayTotalNumOfApponintments = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-today-total-appointments-count", {
        withCredentials: true,
      })
      .then((res) =>
        setTodayTotalNumOfApponintments(res.data.todayTotalAppointmentsCount)
      )
      .catch((err) => console.log(err));
  };

  const getAndPassAllUsers = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/get-all-users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.users);
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );

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
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getAndPassAllVerifiedUsers = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/get-all-verified-users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.users);
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );

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
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getAndPassAllUnverifiedUsers = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/get-all-unverified-users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.users);
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );

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
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  // USER APIS...

  const getTodayAppointmentsCountFilterByUsername = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/today-appointments-count/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setTodayAppointmentCountsByUsername(res.data.appointments))
      .catch((err) => console.log(err));
  };

  const getTotalAppointmentsCountFilterByUsername = async () => {
    await axios
      .get(
        `http://localhost:8000/api/v1/fetch-total-appointments-count/${userId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) =>
        setTotalAppointmentsCountFilterByUsername(res.data.appointments)
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Check if the user is an admin
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
    } else {
      // User specific function calls
      getTodayAppointmentsCountFilterByUsername();
      getTotalAppointmentsCountFilterByUsername();
    }
  }, []);

  return (
    <>
      {role == 1 && isAdmin ? (
        <div className="flex space-x-8 p-8 mx-auto w-6/12">
          {/* Column 1 */}
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Total</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b">Users</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Total</td>
                  <td className="py-2 px-4 border-b">
                    {totalNumOfUsers < 10
                      ? `0${totalNumOfUsers}`
                      : totalNumOfUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded"
                      onClick={() => getAndPassAllUsers()}
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Verified</td>
                  <td className="py-2 px-4 border-b">
                    {totalNumOfVerifiedUsers < 10
                      ? `0${totalNumOfVerifiedUsers}`
                      : totalNumOfVerifiedUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded"
                      onClick={() => getAndPassAllVerifiedUsers()}
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Unverified</td>
                  <td className="py-2 px-4 border-b">
                    {totalNumOfUnverifiedUsers < 10
                      ? `0${totalNumOfUnverifiedUsers}`
                      : totalNumOfUnverifiedUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded"
                      onClick={() => getAndPassAllUnverifiedUsers()}
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Appointments</td>
                  <td className="py-2 px-4 border-b">
                    {totalNumOfAppointments < 10
                      ? `0${totalNumOfAppointments}`
                      : totalNumOfAppointments}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2 */}
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Today</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b">Users</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Total</td>
                  <td className="py-2 px-4 border-b">
                    {todayTotalNumOfUsers < 10
                      ? `0${todayTotalNumOfUsers}`
                      : todayTotalNumOfUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Verified</td>
                  <td className="py-2 px-4 border-b">
                    {todayTotalNumOfVerifiedUsers < 10
                      ? `0${todayTotalNumOfVerifiedUsers}`
                      : todayTotalNumOfVerifiedUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Unverified</td>
                  <td className="py-2 px-4 border-b">
                    {todayTotalNumOfUnverifiedUsers < 10
                      ? `0${todayTotalNumOfUnverifiedUsers}`
                      : todayTotalNumOfUnverifiedUsers}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Appointments</td>
                  <td className="py-2 px-4 border-b">
                    {todayTotalNumOfAppointments < 10
                      ? `0${todayTotalNumOfAppointments}`
                      : todayTotalNumOfAppointments}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex space-x-8 p-8 mx-auto w-6/12">
          {/* Column 1 */}
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Total</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b">
                    Appointments
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Total</td>
                  <td className="py-2 px-4 border-b">
                    {totalAppointmentsCountFilterByUsername < 10
                      ? `0${totalAppointmentsCountFilterByUsername}`
                      : totalAppointmentsCountFilterByUsername}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2 */}
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Today</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 border-b">
                    Appointments
                  </th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                  <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Total</td>
                  <td className="py-2 px-4 border-b">
                    {todayAppointmentCountsByUsername < 10
                      ? `0${todayAppointmentCountsByUsername}`
                      : todayAppointmentCountsByUsername}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Highlights;
