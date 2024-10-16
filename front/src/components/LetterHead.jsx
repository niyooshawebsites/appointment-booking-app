import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const LetterHead = () => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const myStyle = {
    "@mediaPrint": {
      "@page": {
        size: "A4",
        margin: "20mm",
      },
    },
  };

  return (
    <>
      <button onClick={reactToPrintFn}>Print</button>
      <div
        className="flex flex-col border p-5"
        ref={contentRef}
        style={myStyle}
      >
        <header className="flex justify-between">
          <div>
            <h1 className="text-3xl text-blue-400">Dr. Alex Austin</h1>
            <p>MMBS, MS</p>
          </div>
          <div>
            <h2 className="text-2xl text-blue-400">Clinic name</h2>
          </div>
        </header>
        <hr />
        <p className="mt-3 text-center">Date: 12/07/2023</p>
        <section>
          <h1 className="mt-3 text-center text-2xl underline">
            Patient Details
          </h1>
          <table className="mt-5 w-full">
            <thead>
              <tr className="border border-slate-400">
                <th className="border border-slate-400 py-2">Patient Name</th>
                <th className="border border-slate-400 py-2">Age</th>
                <th className="border border-slate-400 py-2">Contact number</th>
                <th className="border border-slate-400 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="border border-slate-400 py-2 text-center">
                  John Doe
                </td>
                <td className="border border-slate-400 py-2 text-center">49</td>
                <td className="border border-slate-400 py-2 text-center">
                  7845747777
                </td>
                <td className="border border-slate-400 py-2 text-center">
                  jd@gmail.com
                </td>
              </tr>
            </tbody>
          </table>
          <div className="border border-t-0 border-slate-400 px-2 py-2 text-center">
            <span>
              <span className="font-bold">Patient Address: </span>Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Modi, ducimus!
            </span>
          </div>
        </section>
        <section>
          <h1 className="mt-3 text-center text-2xl underline">Prescription</h1>
          <div className="h-96 w-full"></div>
        </section>
        <hr />
        <footer className="flex flex-col">
          <div className="flex justify-evenly py-2">
            <div>
              <span className="font-bold">Website</span>: www.docapp/username
            </div>
            <div>
              <span className="font-bold">Contact</span>: 7874784477
            </div>
            <div>
              <span className="font-bold">Email</span>: info@docapp.com
            </div>
            <div>
              <span className="font-bold">Timings</span>: 6 PM - 9 PM
            </div>
          </div>
          <div className="py-2 text-center">
            <span className="font-bold">Address</span>: Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Sint, voluptate?
          </div>
          <div className="py-2 text-center font-bold">
            Kindly book your appointments in advance.
          </div>
        </footer>
      </div>
    </>
  );
};

// Assign a display name to avoid the warning
LetterHead.displayName = "LetterHead";

export default LetterHead;
