import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const { about } = useSelector((state) => state.service_Provider_Slice);

  // const { username } = useSelector((state) => state.user_Slice);
  // console.log(username);

  // getting the username from url
  const path = window.location.pathname;
  let username = path.split("/")[1];
  if (
    username == "register" ||
    username == "login" ||
    username == "about" ||
    username == "contact" ||
    username == ""
  ) {
    username = "abs";
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">{about}</p>
        <div className="flex justify-center items-center">
          {username != "abs" ? (
            <Link
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              to={`/${username}`}
            >
              Book Your Appointment Now
            </Link>
          ) : (
            <Link
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
