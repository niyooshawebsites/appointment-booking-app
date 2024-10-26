import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { dashboardOptionsSliceActions } from "../store/slices/DashboardOptionsSlice";
import { appointmentSliceActions } from "../store/slices/AppointmentSlice";
import { paginationSliceActions } from "../store/slices/PaginationDataSlice";
import { specializationSliceActions } from "../store/slices/SpecializationSlice";
import { onlinePaymentSliceActions } from "../store/slices/OnlinePyamentSlice";
import Pagination from "../components/Pagination";
import { RxLink2, RxBookmarkFilled } from "react-icons/rx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import OnlinePayment from "./OnlinePayment";

const AppointmentForm = ({ serviceProvider, customerDashboard }) => {
  const path = window.location.pathname;
  let username = path.split("/")[1];

  // getting today's day
  const getTodayDay = () => {
    const today = new Date();

    // Get the year, month, and day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    // Format to yyyy-mm-dd
    const todayDate = `${year}-${month}-${day}`;

    return new Date(todayDate).toLocaleDateString("en-US", { weekday: "long" });
  };

  const [custDetails, setCustDetails] = useState(() => {
    return {
      role: "0",
      specialization: "N/A",
      service: "",
      fee: "",
      date: "",
      time: null,
      patientUsername: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      age: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      paymentMethod: "",
      transactionID: "",
      localPay: "N/A",
      serviceProvider,
      day: getTodayDay(),
      timeOfDay: "",
    };
  });

  const { userId } = useSelector((state) => state.user_Slice);
  const { specialization, usersBySpecialization } = useSelector(
    (state) => state.specialization_Slice
  );

  const { timings } = useSelector((state) => state.service_Provider_Slice);
  const { morningFrom, morningTo, eveningFrom, eveningTo } =
    timings[custDetails.day[0].toLowerCase() + custDetails.day.slice(1)];

  const [activateTID, setActivateTID] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  const [isSpecializationChnaged, setIsSpecializationChnaged] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // get all the users by a specific specialization
  const getAllUsersBySpecificSpecialization = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-all-users-by-specific-specialization/${specialization}/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          paginationSliceActions.setPaginationDetails({
            dataToDisplay: "all users with a specific specialization",
            currentPageNo: res.data.currentPageNo,
            totalPages: res.data.totalPages,
          })
        );

        dispatch(
          specializationSliceActions.changeSpecialization({
            specialization: specialization || "Cardiologist",
            usersBySpecialization: res.data.users,
          })
        );
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // get all services by a particular username - for non loggedin clients
  const getAllServicesByUsername = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-services/${username}`
      );

      if (res.data.success) {
        setServices(res.data.services);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    // calling it only for non loggedin user
    if (userId != null) {
      getAllUsersBySpecificSpecialization();
    }

    // for non loggedin clients...
    if (!userId) {
      getAllServicesByUsername();
    }
  }, [isSpecializationChnaged]);

  const handleChangeSpecialization = async (e) => {
    dispatch(
      specializationSliceActions.changeSpecialization({
        specialization: e.target.value,
        usersBySpecialization: [],
      })
    );

    setIsSpecializationChnaged((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "paymentMethod" && value == "Pay online") {
      setActivateTID(true);

      dispatch(
        onlinePaymentSliceActions.changeOnlinePaymentStatus({
          payOnline: true,
        })
      );
    }

    if (name == "paymentMethod" && value == "Pay locally") {
      setActivateTID(false);
    }

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      // account creation for the first time...
      const res = await axios.post("http://localhost:8000/api/v1/register", {
        role: custDetails.role,
        specialization: custDetails.specialization,
        username: custDetails.username,
        password: custDetails.password,
        email: custDetails.email,
      });

      if (res.data.success) {
        toast.success(res.data.msg);

        // book apponitment only when account creation succeeds....
        const response = await axios.post(
          `http://localhost:8000/api/v1/book-appointment/${username}`,
          { ...custDetails, fee: custDetails.service.split("-")[1].slice(4) }
        );

        // appointment booking is successful
        if (response.data.success) {
          toast.success(response.data.msg);
        }

        // reseting everyting
        setCustDetails((prevDetails) => {
          return {
            ...prevDetails,
            service: "",
            fee: "",
            date: "",
            time: "",
            patientUsername: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            age: "",
            gender: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
            paymentMethod: "",
            transactionID: "",
            localPay: "N/A",
            spUsername: username || "",
            day: getTodayDay(),
            timeOfDay: "",
          };
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      toast.error("Please login for booking");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const checkAvailability = async () => {
    if (!custDetails.date || !custDetails.time) {
      return alert(
        "Please fill the appointment date and time to check the availability"
      );
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/check-appointment-availability?date=${custDetails.date}&time=${custDetails.time}&username=${username}`
      );

      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  if (custDetails.timeOfDay == "morning") {
    if (custDetails.time < morningFrom || custDetails.time > morningTo) {
      alert(
        `Please select the timings between ${morningFrom} and ${morningTo}`
      );

      setCustDetails((prevDetails) => {
        return {
          ...prevDetails,
          ["time"]: null,
        };
      });
    }
  }

  // if the client is logged in
  if (customerDashboard) {
    return (
      <div className="mx-auto">
        <label
          htmlFor="specialization"
          className="block text-sm font-medium text-gray-700 mt-3"
        >
          Select Specialization
        </label>
        <select
          name="specialization"
          value={specialization}
          onChange={handleChangeSpecialization}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="ENT Specialist">ENT Specialist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
          <option value="General Physician">General Physician</option>
          <option value="Nephrologist">Nephrologist</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Ophthalmologist">Ophthalmologist</option>
          <option value="Orthopedist">Orthopedist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Psychologist">Psychologist</option>
          <option value="Pulmonologist">Pulmonologist</option>
          <option value="Radiologist">Radiologist</option>
          <option value="Rheumatologist">Rheumatologist</option>
          <option value="Urologist">Urologist</option>
        </select>

        {usersBySpecialization.length > 0 ? (
          <>
            <table className="w-12/12 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-5">
              <thead className="bg-pink-600 border-b border-gray-300 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">DR. Name</th>
                  <th className="py-2 px-4 text-left">Clinic Name</th>
                  <th className="py-2 px-4 text-left">Profile</th>
                  <th className="py-2 px-4 text-left">Book</th>
                </tr>
              </thead>
              <tbody>
                {usersBySpecialization.map((user, index) => {
                  return (
                    <tr
                      key={user._id}
                      className="odd:bg-gray-200 even:bg-white"
                    >
                      <td className="py-2 px-4 text-left text-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 text-left text-gray-600">
                        DR. {user.name}
                      </td>
                      <td className="py-2 px-4 text-left text-gray-600">
                        {user.businessName}
                      </td>
                      <td className="py-2 px-4 text-left text-gray-600">
                        <Link
                          className="text-indigo-600"
                          to={`http://localhost:5173/${user.username}`}
                          target="_blank"
                        >
                          <RxLink2 />
                        </Link>
                      </td>
                      <td className="py-2 px-4 text-left text-gray-600">
                        <Link
                          className="text-indigo-600"
                          customerDashboard={customerDashboard}
                          onClick={() => {
                            dispatch(
                              appointmentSliceActions.appointmentDetails({
                                username: user.username,
                              })
                            );

                            dispatch(
                              dashboardOptionsSliceActions.toggleDashboardOptions(
                                {
                                  showHighlights: false,
                                  showInfo: false,
                                  showServices: false,
                                  showProfile: false,
                                  showAbout: false,
                                  showContact: false,
                                  showAppointmentDetails: false,
                                  showBookAppointment: true,
                                  loginBooking: true,
                                  showLetterHead: false,
                                  showInvoice: false,
                                  showQaulifications: false,
                                  showTimings: false,
                                }
                              )
                            );
                          }}
                        >
                          <RxBookmarkFilled />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination />
          </>
        ) : (
          <div className=" py-5 mx-auto">
            <h1 className="text-center text-lg">No data to display</h1>
          </div>
        )}
      </div>
    );
  }

  // if the client is not logged in
  if (!customerDashboard) {
    return (
      <>
        <form className="w-9/12 mx-auto mb-10" onSubmit={handleSubmit}>
          <div className="space-y-12">
            <h1 className="text-center text-4xl mt-5 text-indigo-600">
              Book Appointment
            </h1>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-pink-600">
                Appointment Details
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <div className="mt-2">
                    <select
                      name="service"
                      id="service"
                      value={custDetails.service}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    >
                      <option value="No slection">Select service</option>
                      {services.map((service) => {
                        return (
                          <option
                            value={`${service.serviceName} - Rs ${service.fee}`}
                            key={service.serviceId}
                          >
                            {`${service.serviceName} - Rs ${service.fee}`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="mt-2">
                    <select
                      name="timeOfDay"
                      id="timeOfDay"
                      value={custDetails.timeOfDay}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    >
                      <option value="No slection">Select service</option>
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={currentDate}
                      autoComplete="on"
                      value={custDetails.date}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2 flex justify-center items-center">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="appt"
                      name="time"
                      placeholder="HH:MM"
                      value={custDetails.time}
                      onChange={handleChange}
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 ml-2"
                      required
                    />
                  </div>
                </div>
                <Link
                  className="text-white text-center bg-green-600 hover:bg-green-700 py-1 px-3 rounded w-full"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-pink-600">
                Personal Details
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="on"
                      value={custDetails.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="on"
                      value={custDetails.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="on"
                      value={custDetails.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="contactNo"
                      name="contactNo"
                      type="number"
                      minLength={10}
                      maxLength={10}
                      autoComplete="on"
                      value={custDetails.contactNo}
                      onChange={handleChange}
                      placeholder="Contact number"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min={1}
                      autoComplete="on"
                      value={custDetails.age}
                      onChange={handleChange}
                      placeholder="Age"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <select
                      name="gender"
                      id="gender"
                      value={custDetails.gender}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    >
                      <option value="No selection">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="on"
                      value={custDetails.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="on"
                      value={custDetails.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      autoComplete="on"
                      value={custDetails.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2">
                    <input
                      id="pinCode"
                      name="pinCode"
                      type="number"
                      minLength={6}
                      maxLength={6}
                      autoComplete="on"
                      value={custDetails.pinCode}
                      onChange={handleChange}
                      placeholder="Pin code"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-pink-600">
                Payment Details
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      value={custDetails.paymentMethod}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    >
                      <option value="">Select payment method</option>
                      <option value="Pay locally">Pay locally</option>
                      <option value="Pay online">Pay online</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      id="transactionID"
                      name="transactionID"
                      type="text"
                      autoComplete="on"
                      value={
                        activateTID
                          ? custDetails.transactionID
                          : custDetails.localPay
                      }
                      onChange={handleChange}
                      placeholder="Online Payment - Enter Transtaction ID"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-pink-600">
                Account registration Details
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <input
                      name="patientUsername"
                      type="text"
                      autoComplete="on"
                      value={custDetails.patientUsername}
                      onChange={handleChange}
                      placeholder="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 flex">
                  <div className="mt-2 w-11/12">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="on"
                      value={custDetails.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                  <div className="w-1/12 flex justify-center items-center text-gray-400">
                    <Link onClick={togglePassword} className="text-2xl">
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Link>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-center">
                Note: Account registration details will create a new patient
                account. Kindly directly login for 2nd booking onwards
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Book Appointment
            </button>
          </div>
        </form>
        <OnlinePayment />
      </>
    );
  }
};

export default AppointmentForm;
