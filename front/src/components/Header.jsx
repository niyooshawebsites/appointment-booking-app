import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../store/slices/UserSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { announcementSliceActions } from "../store/slices/AnnouncementSlice";
import { walkinSliceActions } from "../store/slices/WalkinSlice";
import { HiSpeakerphone } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;
  let user = path.split("/")[1];

  if (
    user == "register" ||
    user == "login" ||
    user == "about" ||
    user == "contact" ||
    user == "verify-email" ||
    user == "forgot-password" ||
    user == "reset-password" ||
    user == "" ||
    user == "dashboard"
  ) {
    user = "abs";
  }

  let myID;

  const { username, role, authenticated, isAdmin, userID } = useSelector(
    (state) => state.user_Slice
  );

  const { businessName } = useSelector((state) => state.service_Provider_Slice);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          userSliceActions.captureLoginUserDetails({
            authenticated: false,
          })
        );

        const navigationLink = user !== "abs" ? `/${user}/login` : "/login";
        navigate(navigationLink);

        dispatch(
          dashboardOptionsSliceActions.toggleDashboardOptions({
            showHighlights: true,
            showAllUsers: false,
            showAppointments: false,
            showServices: false,
            showProfile: false,
            showAbout: false,
            showContact: false,
            showAppointmentDetails: false,
            showBookAppointment: false,
            showLetterHead: false,
            showInvoice: false,
            showQaulifications: false,
            showTimings: false,
          })
        );

        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  if (isAdmin && role == 1) {
    myID = "";
  }

  if (isAdmin == false && role == 1) {
    myID = `Doctor ID: ${userID}`;
  }

  if (isAdmin == false && role == 0) {
    myID = `Patient ID: ${userID}`;
  }

  return (
    <>
      <nav className="bg-indigo-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <button
                className="md:hidden p-1 text-whiterounded text-white mr-5"
                onClick={handleToggle}
              >
                <CgMenuGridR style={{ fontSize: "1.5rem" }} />
              </button>

              <div className="flex flex-shrink-0 items-center">
                <Link
                  to={user !== "abs" ? `/${user}` : "/"}
                  className="text-white text-3xl"
                >
                  {businessName
                    ? businessName
                    : "No Healthcare center name found"}
                </Link>
              </div>

              {/* tablet and Laptop main menu (md and up) */}
              <div className="hidden sm:ml-6 sm:block ml-auto">
                <div className="flex space-x-4 ">
                  {authenticated ? (
                    <>
                      {role == 1 && authenticated ? (
                        <>
                          <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 flex items-center">
                            <Link
                              className="bg-pink-600 px-3 py-2 rounded hover:bg-pink-700"
                              title="New Announcement"
                              onClick={() => {
                                dispatch(
                                  announcementSliceActions.changeAnnouncementStatus(
                                    {
                                      showAnnouncementModal: true,
                                    }
                                  )
                                );
                              }}
                            >
                              <HiSpeakerphone />
                            </Link>
                          </NavLink>

                          {/* only available for service providers */}

                          {!isAdmin ? (
                            <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 flex items-center">
                              <Link
                                className="bg-pink-600 px-3 py-2 rounded hover:bg-pink-700"
                                title="Register walkins"
                                onClick={() => {
                                  dispatch(
                                    walkinSliceActions.changeWalkinStatus({
                                      showWalkinModal: true,
                                    })
                                  );
                                }}
                              >
                                Capture Walkins
                              </Link>
                            </NavLink>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}

                      <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 flex items-center">
                        {myID}
                      </NavLink>
                      <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 flex items-center">
                        <FaRegSmile /> &nbsp; Hello, {username}
                      </NavLink>
                      <NavLink
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-pink-600 hover:text-white flex items-center"
                        onClick={logout}
                      >
                        <AiOutlineLogout style={{ color: "white" }} /> &nbsp;
                        logout
                      </NavLink>
                    </>
                  ) : (
                    <>
                      {user !== "abs" ? (
                        <>
                          <NavLink
                            to={`/${user}/login`}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-pink-600 hover:text-white"
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to={`/${user}/about`}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-pink-600 hover:text-white"
                          >
                            About
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to={`/about`}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-pink-600 hover:text-white"
                          >
                            About
                          </NavLink>
                          <NavLink
                            to="/register"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-pink-600 hover:text-white"
                          >
                            Register
                          </NavLink>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu (md:hidden) */}
              <div className="md:hidden">
                {/* Overlay for mobile */}
                <div
                  className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  onClick={handleToggle}
                ></div>

                {/* Mobile Menu */}
                <div
                  className={`fixed top-0 left-0 w-64 h-full bg-indigo-800 text-white transition-transform transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <h1 className="text-xl font-semibold mb-6 bg-pink-600 p-2 rounded">
                    Menu
                  </h1>

                  {/* ------------------------------------------------------------------------------------------------------------------ */}

                  {authenticated ? (
                    <>
                      {role == 1 && authenticated ? (
                        <>
                          <ul>
                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink>Hello, {username}</NavLink>
                            </li>
                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink>{myID}</NavLink>
                            </li>
                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink>
                                <Link
                                  title="New Announcement"
                                  onClick={() => {
                                    dispatch(
                                      announcementSliceActions.changeAnnouncementStatus(
                                        {
                                          showAnnouncementModal: true,
                                        }
                                      )
                                    );
                                  }}
                                >
                                  New Announcement
                                </Link>
                              </NavLink>
                            </li>
                            {/* only available for service providers */}

                            {!isAdmin ? (
                              <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                                <NavLink>
                                  <Link
                                    title="Register walkins"
                                    onClick={() => {
                                      dispatch(
                                        walkinSliceActions.changeWalkinStatus({
                                          showWalkinModal: true,
                                        })
                                      );
                                    }}
                                  >
                                    Capture Walkins
                                  </Link>
                                </NavLink>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </>
                      ) : (
                        ""
                      )}

                      <ul>
                        <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                          <NavLink onClick={logout}>logout</NavLink>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      {user !== "abs" ? (
                        <>
                          <ul>
                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink to={`/${user}/login`}>Login</NavLink>
                            </li>

                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink to={`/${user}/about`}>About</NavLink>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <>
                          <ul>
                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink to={`/about`}>About</NavLink>
                            </li>

                            <li className="py-2 px-4 hover:bg-pink-600 rounded link flex items-center">
                              <NavLink to={`/register`}>Register</NavLink>
                            </li>
                          </ul>
                        </>
                      )}
                    </>
                  )}

                  {/* ------------------------------------------------------------------------------------------------------------------- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
