import TodayData from "./TodayData";

const Highlights = ({
  setShowHighlights,
  setShowAllUsers,
  setShowAppointments,
  setShowServices,
  setShowProfile,
  setShowAbout,
  showContact,
  setshowAppointmentDetails,
}) => {
  return (
    <>
      {/* -------------------------- fake data----------------------------------------------------------------------------------- */}
      <div className="flex space-x-8 p-8 mx-auto w-6/12">
        {/* Column 1 */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Total</h2>
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">Users</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Total</td>
                <td className="py-2 px-4 border-b">300</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Verified</td>
                <td className="py-2 px-4 border-b">250</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Unverified</td>
                <td className="py-2 px-4 border-b">50</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Appointments</td>
                <td className="py-2 px-4 border-b">500</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Column 2 */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Today</h2>
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">Users</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Data</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Total</td>
                <td className="py-2 px-4 border-b">20</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Verified</td>
                <td className="py-2 px-4 border-b">15</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Unverified</td>
                <td className="py-2 px-4 border-b">05</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Appointments</td>
                <td className="py-2 px-4 border-b">30</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------- fake data----------------------------------------------------------------------------------------------- */}

      {/* Today's data - for admin as well as for the service providers */}
      {/* <TodayData
        setShowHighlights={setShowHighlights}
        setShowAllUsers={setShowAllUsers}
        setShowAppointments={setShowAppointments}
        setShowServices={setShowServices}
        setShowProfile={setShowProfile}
        setShowAbout={setShowAbout}
        showContact={showContact}
        setshowAppointmentDetails={setshowAppointmentDetails}
      /> */}
    </>
  );
};

export default Highlights;
