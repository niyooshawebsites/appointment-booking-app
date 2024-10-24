import { useSelector, useDispatch } from "react-redux";
import { walkinSliceActions } from "../store/slices/WalkinSlice";
import { onlinePaymentSliceActions } from "../store/slices/OnlinePyamentSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import OnlinePayment from "./OnlinePayment";

const Walkin = () => {
  const { showWalkinModal } = useSelector((state) => state.walkin_Slice);
  const [services, setServices] = useState([]);
  const { username } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();
  const [activateTID, setActivateTID] = useState(false);

  const [custDetails, setCustDetails] = useState(() => {
    return {
      service: "",
      date: "",
      time: "",
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
      serviceProvider: username,
    };
  });

  const [payOnline, setPayOnline] = useState(false);

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
    // api for booking appointment
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/book-appointment-by-login/${username}`,
        custDetails,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }

    setCustDetails((prevDetails) => {
      return {
        ...prevDetails,
        service: "",
        date: "",
        time: "",
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
        serviceProvider: username,
      };
    });

    dispatch(
      walkinSliceActions.changeWalkinStatus({
        showWalkinModal: false,
      })
    );
  };

  // get all services by a particular username
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
    getAllServicesByUsername();
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  if (showWalkinModal) {
    return (
      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-6/12 p-6">
          <form
            className="max-w-4xl mx-auto my-4 h-[600px] p-6 border rounded-lg shadow-md bg-white"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2 h-full flex flex-col justify-start">
              {/* Appointment Details */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-2 text-pink-600">
                  Appointment Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <select
                      name="service"
                      id="service"
                      value={custDetails.service}
                      onChange={handleChange}
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select service</option>
                      {services.map((service) => (
                        <option
                          value={service.serviceName}
                          key={service.serviceId}
                        >
                          {`${service.serviceName} - Rs${service.fee}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={currentDate}
                      autoComplete="on"
                      value={custDetails.date}
                      onChange={handleChange}
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <label htmlFor="time" className="block mb-1 mr-2">
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={custDetails.time}
                      onChange={handleChange}
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 "
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="border-b border-t pb-4">
                <h2 className="text-lg font-semibold mb-2 text-pink-600">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="on"
                      value={custDetails.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="on"
                      value={custDetails.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="on"
                      value={custDetails.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
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
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
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
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <select
                      name="gender"
                      id="gender"
                      value={custDetails.gender}
                      onChange={handleChange}
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="col-span-full">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="on"
                      value={custDetails.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="on"
                      value={custDetails.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      autoComplete="on"
                      value={custDetails.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
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
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-2 text-pink-600">
                  Payment Details
                </h2>
                <div className="flex justify-between align-middle ">
                  <div className="w-6/12 pr-1">
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      value={custDetails.paymentMethod}
                      onChange={handleChange}
                      required
                      className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Select payment method">
                        Select payment method
                      </option>
                      <option
                        value="Pay locally"
                        onClick={() => setPayOnline(false)}
                      >
                        Pay locally
                      </option>
                      <option
                        value="Pay online"
                        onClick={() => setPayOnline(true)}
                      >
                        Pay online
                      </option>
                    </select>
                  </div>

                  <div className="w-6/12 pl-1">
                    <div className="m-1">
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

              <div className="flex justify-end gap-x-4">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                  onClick={() => {
                    dispatch(
                      walkinSliceActions.changeWalkinStatus({
                        showWalkinModal: false,
                      })
                    );
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </form>
          <OnlinePayment />
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default Walkin;
