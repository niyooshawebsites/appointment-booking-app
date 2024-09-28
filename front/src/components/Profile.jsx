import { useState } from "react";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const handleChange = (e) => {};

  return (
    <div className="w-4/12 mx-auto">
      <h2 className="mt-10 mb-4 text-center text-2xl">Update Profile</h2>
      <form action="" className="w-full p-3 mt-2 rounded-md ">
        <div className="mt-4">
          <input
            name="newPassword"
            type="password"
            autoComplete="on"
            value={newPassword}
            placeholder="New Password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
        </div>
        <div className="mt-4">
          <input
            name="confirmNewPassword"
            type="password"
            autoComplete="on"
            value={newConfirmPassword}
            placeholder="Confirm New Password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
          />
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
