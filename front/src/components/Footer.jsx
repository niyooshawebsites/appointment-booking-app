import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { businessName, about, email, contactNo, services, contact } =
    useSelector((state) => state.service_Provider_Slice);

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
    <footer className="bg-gray-800 text-white py-8">
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
                to="https://facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaLinkedin />
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

      <div className="bg-gray-900 py-4 mt-8">
        <p className="text-center text-gray-400 text-sm">
          &copy; 2024 Niyoosha Websites LLP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
