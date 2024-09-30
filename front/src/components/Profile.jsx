import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeNewConfirmPassword = (e) => {
    setNewConfirmPassword(e.target.value);
  };

  console.log(showNewPassword);
  const toggleNewPassword = () => {
    setShowNewPassword((prevSate) => !prevSate);
  };

  const toggleNewConfirmPassword = () => {
    setShowNewConfirmPassword((prevSate) => !prevSate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword != newConfirmPassword) {
      return toast.error("Password mismatch!");
    }

    await axios
      .patch(
        "http://localhost:8000/api/v1/update-password",
        { newPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Password updated successfully");
        setNewPassword("");
        setNewConfirmPassword("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Password updation failed");
      });
  };

  return (
    <div className="w-4/12 mx-auto">
      <h2 className="mt-10 mb-4 text-center text-2xl">Update Profile</h2>
      <form className="w-full p-3 mt-2 rounded-md " onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="flex">
            {/* 11/12 Column */}
            <div className="w-11/12">
              <input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                autoComplete="on"
                value={newPassword}
                onChange={handleChangeNewPassword}
                placeholder="New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            {/* 1/12 Column */}
            <div className="w-1/12 p-2">
              <Link
                onClick={toggleNewPassword}
                className="text-2xl text-gray-400"
              >
                {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex">
            {/* 11/12 Column */}
            <div className="w-11/12">
              <input
                name="confirmNewPassword"
                type={showNewConfirmPassword ? "text" : "password"}
                autoComplete="on"
                value={newConfirmPassword}
                onChange={handleChangeNewConfirmPassword}
                placeholder="Confirm New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            {/* 1/12 Column */}
            <div className="w-1/12 p-2">
              <Link
                onClick={toggleNewConfirmPassword}
                className="text-2xl text-gray-400"
              >
                {showNewConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
