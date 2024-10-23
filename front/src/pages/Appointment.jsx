import Layout from "../components/Layout";
import AppointmentForm from "../components/AppointmentForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import axios from "axios";
import Ticker from "../components/Ticker";
import Unverified from "../components/Unverified";

const Appointment = ({ serviceProvider }) => {
  const { announcement, isVerified } = useSelector(
    (state) => state.service_Provider_Slice
  );
  const dispatch = useDispatch();

  // getting the username from url
  const path = window.location.pathname;
  const username = path.split("/")[1] || "abs";

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
            announcement: res.data.announcement,
          })
        );
      })
      .catch((err) => console.log(err));
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
