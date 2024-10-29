import Layout from "../components/Layout";
import AppointmentForm from "../components/AppointmentForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import axios from "axios";
import Ticker from "../components/Ticker";
import Unverified from "../components/Unverified";
import { toast } from "react-toastify";

const Appointment = ({ serviceProvider }) => {
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

  const { announcement, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );
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
      {announcement ? (
        <>
          <Ticker />
          <AppointmentForm serviceProvider={serviceProvider} />
        </>
      ) : (
        <AppointmentForm serviceProvider={serviceProvider} />
      )}
    </Layout>
  );
};

export default Appointment;
