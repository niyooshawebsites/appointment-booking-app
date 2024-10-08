import { useSelector } from "react-redux";

const AppointmentDetails = () => {
  const {
    service,
    date,
    time,
    firstName,
    lastName,
    email,
    contactNo,
    age,
    gender,
    address,
    city,
    state,
    pinCode,
    paymentMethod,
  } = useSelector((state) => state.appointment_Slice);

  console.log(
    service,
    date,
    time,
    firstName,
    lastName,
    email,
    contactNo,
    age,
    gender,
    address,
    city,
    state,
    pinCode,
    paymentMethod
  );
  return (
    <div className="w-8/12 mx-auto">
      <div className="space-y-1">
        <div className="border-b border-gray-900/10 py-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Appintment Details
          </h2>
          <div className="mt-2 grid grid-cols-3 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <div className="mt-2">
                <label>Service</label>
                <input
                  type="text"
                  value={service}
                  readOnly
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  disabled
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="mt-2">
                <label>Date</label>
                <input
                  type="text"
                  value={date.split("-").reverse().join("-")}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="mt-2">
                <label>Time</label>
                <input
                  type="text"
                  value={time}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 py-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Details
          </h2>

          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-5">
            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Contact Number</label>
                <input
                  type="text"
                  value={contactNo}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Age</label>
                <input
                  type="text"
                  value={age}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Gender</label>
                <input
                  type="text"
                  value={gender}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>State</label>
                <input
                  type="text"
                  value={state}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="mt-2">
                <label>Pin Code</label>
                <input
                  type="text"
                  value={pinCode}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <div className="mt-2">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Payment Details
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-2">
                <input
                  type="text"
                  value={paymentMethod}
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
