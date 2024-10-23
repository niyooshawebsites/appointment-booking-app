import { Link } from "react-router-dom";

const VerificationOutcome = ({ outCome }) => {
  // getting the username from url
  const path = window.location.pathname;
  let username = path.split("/")[1];

  if (
    username == "register" ||
    username == "login" ||
    username == "about" ||
    username == "contact" ||
    username == "verify-email" ||
    username == "forgot-password" ||
    username == "reset-password" ||
    username == ""
  ) {
    username = "abs";
  }

  return (
    <>
      {outCome ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
              Email verfication successful
            </h2>
            <Link to={username != "abs" ? `/${username}/login` : "/login"}>
              <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-center">
                Log In
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
              Email verfication failed
            </h2>
            <Link to={username != "abs" ? `/${username}` : "/"}>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center">
                Return to home
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const EmailVerificationMsg = ({ outCome, loading }) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">
              Verifying...
            </h2>
          </div>
        </div>
      ) : (
        <VerificationOutcome outCome={outCome} />
      )}
    </>
  );
};

export default EmailVerificationMsg;
