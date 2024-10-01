import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const UsersInfo = () => {
  const [usersDetails, setUsersDetails] = useState(() => []);
  const [userDeleted, setUserDeleted] = useState(false);
  const [searchUser, setSearchUser] = useState(() => "");

  const getUsersDetails = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/get-all-users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.users);
          setUsersDetails(res.data.users);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getUsersDetails();
  }, [userDeleted]);

  return (
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
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
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
                  <td className="py-2 px-4 text-gray-700">{user.username}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {user.businessName}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 text-gray-700">{user.contact}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {moment(user.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    <Link
                      onClick={() => handleDelete(user._id)}
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
  );
};

export default UsersInfo;
