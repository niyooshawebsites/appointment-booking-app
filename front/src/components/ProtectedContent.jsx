import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import { toast } from "react-toastify";

const ProtectedContent = () => {
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
    username == "dashboard" ||
    username == ""
  ) {
    username = "abs";
  }

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
            about: res.data.about,
            email: res.data.email,
            contactNo: res.data.contactNo,
            services: res.data.services,
            contact: res.data.contact,
            socialProfiles: res.data.socialProfiles,
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

  const { authenticated } = useSelector((state) => state.user_Slice);
  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={username !== "abs" ? `/${username}/login` : "/login"} />
  );
};

export default ProtectedContent;
