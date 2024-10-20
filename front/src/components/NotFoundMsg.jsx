import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";

const NotFoundMsg = () => {
  const dispatch = useDispatch();

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

  const checkUser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/checkUser/${username}`)
      .then((res) => {
        dispatch(
          serviceProviderSliceActons.serviceProviderDetails({
            username: username,
            businessName: res.data.contact.businessName,
            isVerified: res.data.isVerified,
            about: res.data.about,
            email: res.data.email,
            contactNo: res.data.contactNo,
            services: res.data.services,
            contact: res.data.contact,
            socialProfiles: res.data.socialProfiles,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkUser();
  }, [username]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">404</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        The content doest exist!
      </p>
      <div className="flex justify-center items-center">
        <Link
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to={`/`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundMsg;
