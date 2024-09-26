import Layout from "../components/Layout";
import AppointmentForm from "../components/AppointmentForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import axios from "axios";

const Appointment = ({ serviceProvider }) => {
  const dispatch = useDispatch();

  // getting the username from url
  const path = window.location.pathname;
  const username = path.split("/")[1] || "abs";

  const checkUser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/checkUser/${username}`)
      .then((res) => {
        console.log(res);
        dispatch(
          serviceProviderSliceActons.serviceProviderDetails({
            username: username,
            businessName: res.data.contact.businessName,
            about: res.data.about,
            email: res.data.email,
            contactNo: res.data.contactNo,
            services: res.data.services,
            contact: res.data.contact,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkUser();
  }, [username]);

  return (
    <Layout>
      <AppointmentForm serviceProvider={serviceProvider} />
    </Layout>
  );
};

export default Appointment;
