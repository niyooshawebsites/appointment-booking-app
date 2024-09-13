import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EmailVerificationMsg = ({ outCome }) => {
  return (
    <>
      {outCome ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
              Email verfication successful
            </h2>
            <Link
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              to="/login"
            >
              Log In
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
              Email verfication failed
            </h2>
            <Link
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              to="/"
            >
              Return Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerificationMsg;
