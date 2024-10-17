import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

const LetterHead = () => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
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

  const { username } = useSelector((state) => state.user_Slice);

  const myStyle = {
    "@mediaPrint": {
      "@page": {
        size: "A4",
      },
    },
    width: "100%",
    height: "297mm",
  };

  return (
    <div
      className="m-1"
      style={{ transform: "scale(0.5)", margin: "-300px 0" }}
    >
      <div className="flex justify-end">
        <button
          onClick={reactToPrintFn}
          className=" text-3xl bg-indigo-500 px-4 py-2 rounded text-white m-2 hover:bg-indigo-700"
        >
          Print
        </button>
      </div>
      <div
        className="flex flex-col justify-between border border-slate-500 p-5"
        ref={contentRef}
        style={myStyle}
      >
        <div>
          <header className="flex justify-between mb-3">
            <div>
              <h1 className="text-3xl text-blue-400">Dr. {username}</h1>
              <p>MMBS, MS</p>
            </div>
            <div>
              <h2 className="text-2xl text-blue-400">{username}</h2>
            </div>
          </header>
          <hr className="mb-3" />
          <p className="mt-3 text-center">
            Date: {date} | Time: {time}
          </p>
          <section>
            <h1 className="mt-3 text-center text-2xl underline">
              Patient Details
            </h1>
            <table className="mt-5 w-full">
              <thead>
                <tr className="border border-slate-400">
                  <th className="border border-slate-400 py-2">Name</th>
                  <th className="border border-slate-400 py-2">Age</th>
                  <th className="border border-slate-400 py-2">Gender</th>
                  <th className="border border-slate-400 py-2">
                    Contact number
                  </th>
                  <th className="border border-slate-400 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border border-slate-400 py-2 text-center">
                    {`${firstName} ${lastName}`}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {age}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {gender}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {contactNo}
                  </td>
                  <td className="border border-slate-400 py-2 text-center">
                    {email}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border border-t-0 border-slate-400 px-2 py-2 text-center">
              <span>
                <span className="font-bold">Patient Address: </span>
                {`${address}, ${city}, ${state} ${pinCode}`}
              </span>
            </div>
            <div className="border border-t-0 border-slate-400 px-2 py-2 text-center">
              <span>
                <span className="font-bold">Service: </span>
                {service}
              </span>
            </div>
          </section>
          <section>
            <h1 className="mt-3 text-center text-2xl underline">
              Prescription
            </h1>
            <div className="h-96 w-full"></div>
          </section>
        </div>

        <footer className="flex flex-col">
          <hr />
          <div className="py-2 text-center">
            <span className="font-bold">Address</span>: Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Sint, voluptate?
          </div>
          <div className="flex justify-center py-2">
            <div className="mx-2">
              <span className="font-bold">Website</span>:
              www.docapp.com/username
            </div>
            <div className="mx-2">
              <span className="font-bold">Timings</span>: 6 PM - 9 PM
            </div>
          </div>
          <div className="flex justify-center py-2">
            <div className="mx-2">
              <span className="font-bold">Contact</span>: 7874784477
            </div>
            <div className="mx-2">
              <span className="font-bold">Email</span>: info@docapp.com
            </div>
          </div>
          <div className="py-2 text-center font-bold">
            Kindly book your appointments online.
          </div>
        </footer>
      </div>
    </div>
  );
};

// Assign a display name to avoid the warning
LetterHead.displayName = "LetterHead";

export default LetterHead;
