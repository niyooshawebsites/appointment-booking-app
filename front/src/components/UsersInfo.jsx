import { useState, useEffect } from "react";
import axios from "axios";

const UsersInfo = () => {
  const [usersDetails, setUsersDetails] = useState(() => {
    return {
      name: "",
      businessName: "",
      username: "",
      email: "",
      contact: "",
      DOJ: "",
      Action: "",
    };
  });

  const getUsersDetails = async () => {
    await axios.get("http://localhost:8000/api/v1/get-all-users", {
      withCredentials: true,
    });
  };

  useEffect(() => getUsersDetails(), []);

  return (
    <div className="mx-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-5">
        <thead className="bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">#</th>
            <th className="py-2 px-4 text-left text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-gray-600">B Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Username</th>
            <th className="py-2 px-4 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 text-left text-gray-600">Contact</th>
            <th className="py-2 px-4 text-left text-gray-600">DOJ</th>
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">#</th>
            <th className="py-2 px-4 text-left text-gray-600">F Name</th>
            <th className="py-2 px-4 text-left text-gray-600">L Name</th>
            <th className="py-2 px-4 text-left text-gray-600">B Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Username</th>
            <th className="py-2 px-4 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 text-left text-gray-600">Contact</th>
            <th className="py-2 px-4 text-left text-gray-600">DOJ</th>
            <th className="py-2 px-4 text-left text-gray-600">Action</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersInfo;
