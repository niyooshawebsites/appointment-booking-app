import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import { FaUserCog } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { toast } from "react-toastify";
import {
  RxClock,
  RxStar,
  RxComponent1,
  RxBackpack,
  RxBookmarkFilled,
} from "react-icons/rx";
import axios from "axios";

/* eslint-disable react/prop-types */
const Sidebar = () => {
  const { role, isAdmin } = useSelector((state) => state.user_Slice);
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
    username == "dashboard" ||
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

  // admin sidebar optoins
  if (role == 1 && isAdmin) {
    return (
      <div className="w-2/12 bg-indigo-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
          My Dashboard
        </h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxStar style={{ color: "white" }} /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }

  // service provider sidebar options
  if (role == 1 && isAdmin == false) {
    return (
      <div className="w-2/12 bg-indigo-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
          My Dashboard
        </h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxStar /> &nbsp; Highlights
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: true,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <LuMenuSquare style={{ color: "white" }} /> &nbsp; Services
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: true,
                  showTimings: false,
                })
              );
            }}
          >
            <RxBackpack style={{ color: "white" }} /> &nbsp; Qualifications
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: true,
                })
              );
            }}
          >
            <RxClock style={{ color: "white" }} /> &nbsp; Timings
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: true,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <CgWebsite style={{ color: "white" }} /> &nbsp; About
          </li>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: true,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxComponent1 style={{ color: "white" }} /> &nbsp; Contact
          </li>

          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }

  // clients sidebar options
  if (role == 0 && isAdmin == false) {
    return (
      <div className="w-2/12 bg-indigo-800 text-white h-full p-4">
        <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
          My Dashboard
        </h1>
        <ul>
          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: true,
                  showInfo: false,
                  showServices: false,
                  showProfile: false,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <RxStar style={{ color: "white" }} /> &nbsp; Highlights
          </li>

          {username == "abs" ? (
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() => {
                dispatch(
                  dashboardOptionsSliceActions.toggleDashboardOptions({
                    showHighlights: false,
                    showInfo: false,
                    showServices: false,
                    showProfile: false,
                    showAbout: false,
                    showContact: false,
                    showAppointmentDetails: false,
                    showBookAppointment: true,
                    showLetterHead: false,
                    loginBooking: false,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <RxBookmarkFilled style={{ color: "white" }} /> &nbsp; Book
              Appointment
            </li>
          ) : (
            <li
              className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
              onClick={() => {
                dispatch(
                  appointmentSliceActions.appointmentDetails({
                    username,
                  })
                );

                dispatch(
                  dashboardOptionsSliceActions.toggleDashboardOptions({
                    showHighlights: false,
                    showInfo: false,
                    showServices: false,
                    showProfile: false,
                    showAbout: false,
                    showContact: false,
                    showAppointmentDetails: false,
                    showBookAppointment: true,
                    showLetterHead: false,
                    loginBooking: true,
                    showQaulifications: false,
                    showTimings: false,
                  })
                );
              }}
            >
              <RxBookmarkFilled style={{ color: "white" }} /> &nbsp; Book
              Appointment
            </li>
          )}

          <li
            className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center"
            onClick={() => {
              dispatch(
                dashboardOptionsSliceActions.toggleDashboardOptions({
                  showHighlights: false,
                  showInfo: false,
                  showServices: false,
                  showProfile: true,
                  showAbout: false,
                  showContact: false,
                  showAppointmentDetails: false,
                  showBookAppointment: false,
                  showLetterHead: false,
                  showQaulifications: false,
                  showTimings: false,
                })
              );
            }}
          >
            <FaUserCog style={{ color: "white" }} /> &nbsp; Profile
          </li>
        </ul>
      </div>
    );
  }
};

export default Sidebar;
