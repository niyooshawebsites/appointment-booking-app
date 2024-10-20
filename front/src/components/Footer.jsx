import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { serviceProviderSliceActons } from "../store/slices/ServiceProviderSlice";
import axios from "axios";

const Footer = () => {
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

  const dispatch = useDispatch();

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
            announcement: res.data.announcement || "",
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkUser();
  }, [username]);

  const {
    businessName,
    about,
    email,
    contactNo,
    services,
    contact,
    socialProfiles,
    isVerified,
  } = useSelector((state) => state.service_Provider_Slice);

  return (
    <footer className="bg-indigo-900 text-white py-8">
      {isVerified ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 mb-4">
                {about.substring(0, 100) + "..."}
              </p>{" "}
              <Link to={username == "abs" ? "/about" : `/${username}/about`}>
                {" "}
                More
              </Link>
              <div className="flex space-x-4 mt-4">
                <Link
                  to={socialProfiles.facebookUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-white text-xl"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to={socialProfiles.xUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-white text-xl"
                >
                  <FaXTwitter />
                </Link>
                <Link
                  to={socialProfiles.instagramUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-white text-xl"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={socialProfiles.linkedInUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-white text-xl"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  to={socialProfiles.youtubeUrl}
                  target="_blank"
                  className="text-gray-400 hover:text-white text-xl"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>

            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul>
                {services.map((service) => {
                  return (
                    <li key={service.serviceId}>
                      <Link href="#" className="text-gray-400 hover:text-white">
                        {service.serviceName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-full sm:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
              <p className="text-gray-400">{businessName}</p>
              <p className="text-gray-400">
                {contact.office} {contact.floor} {contact.building}
              </p>
              <p className="text-gray-400">
                {contact.street} {contact.locality}
              </p>
              <p className="text-gray-400">
                {contact.district} {contact.state} {contact.pinCode}
              </p>
              <p className="text-gray-400">Email: {email}</p>
              <p className="text-gray-400">Phone: {contactNo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-1 w-full bg-indigo-900"></div>
      )}

      <div className="bg-pink-600 py-4 mt-8">
        <p className="text-center text-white text-sm">
          &copy; 2024 Niyoosha Websites LLP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
