import { useState, useEffect } from "react";
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

  const getTotalNumOfUsers = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-total-users-count", {
        withCredentials: true,
      })
      .then((res) => setTotalNumOfUsers(res.data.totalUsersCount))
      .catch((err) => console.log(err));
  };

  const getTotalNumOfVerifiedUsers = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-total-verified-users-count", {
        withCredentials: true,
      })
      .then((res) =>
        setTotalNumOfVerifiedUsers(res.data.totalVerifiedUsersCount)
      )
      .catch((err) => console.log(err));
  };

  const getTotalNumOfUnverifiedUsers = async () => {
    await axios
      .get("http://localhost:8000/api/v1/get-total-unverified-users-count", {
        withCredentials: true,
      })
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

  useEffect(() => {
    getTotalNumOfUsers();
    getTotalNumOfVerifiedUsers();
    getTotalNumOfUnverifiedUsers();
    getTotalNumOfAppointments();
    getTodayTotalNumOfUsers();
    getTodayTotalNumOfVerifiedUsers();
    getTodayTotalNumOfUnverifiedUsers();
    getTodayTotalNumOfApponintments();
  }, []);

  return (
    <>
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
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
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
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
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
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
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
    </>
  );
};

export default Highlights;
