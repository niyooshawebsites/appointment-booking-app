/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        return toast.error("Password mismatch!");
      }

      await axios
        .patch(
          `http://localhost:8000/api/v1/reset-password/${emailVerificationToken}`,
          {
            newPassword,
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Password reset successful");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Password reset failed");
        });
    } catch (err) {
      console.log(err);
      toast.error("Error resetting password. Try again");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={handleChangeNewPassword}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="New password"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          Confirm New Password
        </label>
        <input
          type="password"
          onChange={handleChangeConfirmNewPassword}
          value={confirmNewPassword}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Cofirm new password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;