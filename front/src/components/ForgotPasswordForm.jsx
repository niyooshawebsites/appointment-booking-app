const ForgotPasswordForm = () => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
