import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeApponitmentStatusSliceActions } from "../store/slices/ChangeAppointmentStatusSlice";
import { appointmentsDataSliceActions } from "../store/slices/AppintmentsDataSlice";

const RejectionReason = () => {
  const dispatch = useDispatch();
  const [rejectReason, setRejectReason] = useState("");
  const { appointmentId, appointmentStatus } = useSelector(
    (state) => state.change_Appointment_Status_Slice
  );
  const { userId } = useSelector((state) => state.user_Slice);

  const handleSubmit = async (e, appId) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/change-appointment-status/${appId}`,
        { rejectReason, appointmentStatus: "Rejected" },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(
          changeApponitmentStatusSliceActions.changeAppointmentStatus({
            appointmentId: "",
            appointmentStatus: false,
          })
        );

        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/get-all-appointments-by-userId/${userId}/1`,
            {
              withCredentials: true,
            }
          );

          if (res.data.success) {
            dispatch(
              appointmentsDataSliceActions.getAppointmentsData({
                allAppointments: res.data.appointments,
              })
            );
          }
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    setRejectReason(e.target.value);
  };

  if (appointmentStatus) {
    return (
      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-6/12 p-6">
          <h2 className="text-lg font-bold mb-4 text-pink-600">
            Rejection reason
          </h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e, appointmentId);
            }}
          >
            <div className="mb-4">
              <label className="block mb-2" htmlFor="rejectReason">
                Reason
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                id="rejectReason"
                value={rejectReason}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                id="closeModal"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
                onClick={() => {
                  dispatch(
                    changeApponitmentStatusSliceActions.changeAppointmentStatus(
                      {
                        appointmentId: "",
                        appointmentStatus: false,
                      }
                    )
                  );
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default RejectionReason;
