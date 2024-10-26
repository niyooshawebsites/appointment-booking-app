import { useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import Unverified from "../components/Unverified";
import { toast } from "react-toastify";

const About = () => {
  const { about, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );
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
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/checkUser/${username}`
      );

      if (res.data.success) {
        // dispatch(
        //   serviceProviderSliceActons.serviceProviderDetails({
        //     username: username,
        //     businessName: res.data.contact.businessName,
        //     isVerified: res.data.isVerified,
        //     about: res.data.about,
        //     email: res.data.email,
        //     contactNo: res.data.contactNo,
        //     services: res.data.services,
        //     contact: res.data.contact,
        //     socialProfiles: res.data.socialProfiles,
        //     announcement: res.data.announcement,
        //   })
        // );

        dispatch(
          serviceProviderSliceActons.serviceProviderDetails({
            username: username,
            businessName: res.data.contact.businessName,
            isVerified: res.data.isVerified,
            timings: res.data.timings.days,
            about: res.data.about,
            email: res.data.email,
            contactNo: res.data.contactNo,
            services: res.data.services,
            contact: res.data.contact,
            socialProfiles: res.data.socialProfiles,
            announcement: res.data.announcement || "",
          })
        );
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    checkUser();
  }, [username]);

  if (!isVerified) {
    return (
      <Layout>
        <Unverified />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-justify">{about}</p>
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
