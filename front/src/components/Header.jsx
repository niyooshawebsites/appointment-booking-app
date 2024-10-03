import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../store/slices/UserSlice";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import axios from "axios";

const Header = () => {
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
    user == ""
  ) {
    user = "abs";
  }

  const { username } = useSelector((state) => state.user_Slice);
  const { authenticated } = useSelector((state) => state.user_Slice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios
        .post(
          "http://localhost:8000/api/v1/logout",
          {},
          { withCredentials: true }
        )
        .then(() => {
          dispatch(
            userSliceActions.captureLoginUserDetails({
              authenticated: false,
            })
          );
          navigate("/");
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
            })
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link to={user !== "abs" ? `/${user}` : "/"}>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block ml-auto">
              <div className="flex space-x-4 ">
                {authenticated ? (
                  <>
                    <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300">
                      Hello, {username}
                    </NavLink>
                    <NavLink
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={logout}
                    >
                      logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    {user !== "abs" ? (
                      <>
                        <NavLink
                          to={`/${user}`}
                          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          aria-current="page"
                        >
                          Book Appointment
                        </NavLink>
                        <NavLink
                          to={`/${user}/about`}
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          About
                        </NavLink>
                        <NavLink
                          to={`/${user}/contact`}
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Contact
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to={`/about`}
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          About
                        </NavLink>
                        <NavLink
                          to={`/contact`}
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Contact
                        </NavLink>
                        <NavLink
                          to="/register"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Register
                        </NavLink>
                        <NavLink
                          to="/login"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Login
                        </NavLink>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {authenticated ? (
            <>
              <NavLink className="rounded-md px-3 py-2 text-sm font-medium text-gray-300">
                Hello, {username}
              </NavLink>
              <NavLink
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={logout}
              >
                logout
              </NavLink>
            </>
          ) : (
            <>
              {user !== "abs" ? (
                <>
                  <NavLink
                    to={`/${user}`}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Book Appointment
                  </NavLink>
                  <NavLink
                    to={`/${user}/about`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={`/${user}/contact`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Contact
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/about`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={`/contact`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
