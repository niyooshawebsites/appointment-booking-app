import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Unverified from "../components/Unverified";

const Home = () => {
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
    username == "" ||
    username == null
  ) {
    username = "abs";
  }

  const { isVerified } = useSelector((state) => state.service_Provider_Slice);

  const dispatch = useDispatch();

  const checkUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/checkUser/${username}`
      );

      if (res.data.success) {
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
      <LoginForm />
    </Layout>
  );
};

export default Home;
