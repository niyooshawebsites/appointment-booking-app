import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const {
    username,
    businessName,
    about,
    email,
    timings,
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
          <div className="flex flex-wrap justify-evenly">
            <div className="w-full sm:w-3/12 mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400 mb-4">
                {about.length > 0
                  ? about.substring(0, 100) + "..."
                  : "No about content found"}

                {about.length > 120 ? (
                  <Link
                    to={username == "abs" ? "/about" : `/${username}/about`}
                    className="text-white"
                  >
                    {" "}
                    More
                  </Link>
                ) : (
                  ""
                )}
              </p>
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

            <div className="w-full sm:w-2/12 mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              {services.length > 0 ? (
                <ul>
                  {services.map((service) => {
                    return (
                      <li key={service.serviceId}>
                        {""}
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white"
                        >
                          {service.serviceName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400">No sevices found</p>
              )}
            </div>

            <div className="w-full sm:w-4/12 mb-6 sm:mb-0">
              <h3 className="text-lg font-semibold mb-4">
                Timings (Morning & Evening)
              </h3>
              <ul>
                {timings &&
                typeof timings === "object" &&
                Object.keys(timings).length > 0 ? (
                  Object.entries(timings).map(([day, times], index) => (
                    <div key={index}>
                      <span className="text-gray-400">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                        <span className="text-white">{" >> "}</span>
                      </span>
                      <span className="text-gray-400">
                        {times.morningFrom == "Off" && times.morningTo == "Off"
                          ? "Not set"
                          : `${times.morningFrom} - ${times.morningTo}`}
                      </span>
                      {" & "}
                      <span className="text-gray-400">
                        {times.eveningFrom == "Off" && times.eveningTo == "Off"
                          ? "Not set"
                          : `${times.eveningFrom} - ${times.eveningTo}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <h1>No timings set</h1>
                )}
              </ul>
            </div>

            <div className="w-full sm:w-3/12">
              <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
              <p className="text-gray-400">
                {businessName ? businessName : "No Heathcare center name found"}
                ,
              </p>
              <p className="text-gray-400">
                {contact.office || contact.floor || contact.building
                  ? `${contact.office}, ${contact.floor}, ${contact.building}`
                  : ""}
              </p>
              <p className="text-gray-400">
                {contact.street || contact.locality
                  ? `${contact.street}, ${contact.locality}`
                  : ""}
              </p>
              <p className="text-gray-400">
                {contact.district || contact.state || contact.pinCode
                  ? `${contact.district}, ${contact.state} - ${contact.pinCode}`
                  : ""}
              </p>
              <br />
              <p className="text-gray-400">Email: {email}</p>
              <p className="text-gray-400">
                Phone: {contactNo.length > 10 ? "No contact no set" : contactNo}
              </p>
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
