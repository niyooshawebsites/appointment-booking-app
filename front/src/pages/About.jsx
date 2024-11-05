import Layout from "../components/Layout";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Unverified from "../components/Unverified";

const About = () => {
  const { username, about, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );

  if (!username) {
    // getting the username from url
    const path = window.location.pathname;
    let userName = path.split("/")[1];

    if (
      userName == "register" ||
      userName == "login" ||
      userName == "about" ||
      userName == "contact" ||
      userName == "verify-email" ||
      userName == "forgot-password" ||
      userName == "reset-password" ||
      userName == ""
    ) {
      userName = "abs";
    }

    return <Navigate to={userName != "abs" ? `/${userName}` : "/"} />;
  }

  if (!isVerified) {
    return (
      <Layout>
        <Unverified />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 md:px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
          About
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-justify">
          {about.length > 0 ? (
            about
          ) : (
            <p className="text-center">No 'about' content found</p>
          )}
        </p>
        <div className="flex justify-center items-center">
          {username != "abs" ? (
            <Link
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              to={`/${username}`}
            >
              Book Your Appointment Now
            </Link>
          ) : (
            <Link
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              to={`/register`}
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default About;
