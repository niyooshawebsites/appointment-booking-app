const ResetPasswordForm = () => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          New Password
        </label>
        <input
          type="password"
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
