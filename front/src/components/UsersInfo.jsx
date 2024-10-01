import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersInfo = () => {
  const [usersDetails, setUsersDetails] = useState(() => []);

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

  const handleDelete = async (id) => {};

  useEffect(() => {
    getUsersDetails();
  }, []);

  return (
    <div className="mx-auto">
      <table className="w-8/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
        <thead className="bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">#</th>
            <th className="py-2 px-4 text-left text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-gray-600">B Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 text-left text-gray-600">Contact</th>
            <th className="py-2 px-4 text-left text-gray-600">DOJ</th>
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersDetails.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="py-2 px-4 text-gray-700">{index + 1}</td>
                <td className="py-2 px-4 text-gray-700">{user.name}</td>
                <td className="py-2 px-4 text-gray-700">{user.businessName}</td>
                <td className="py-2 px-4 text-gray-700">{user.email}</td>
                <td className="py-2 px-4 text-gray-700">{user.contact}</td>
                <td className="py-2 px-4 text-gray-700">{user.createdAt}</td>
                <td className="py-2 px-4 text-gray-700">
                  <Link
                    onClick={() => handleDelete(user._id)}
                    className="text-red/500"
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
