import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { announcementSliceActions } from "../store/slices/AnnouncementSlice";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("");
  const { showAnnouncementModal } = useSelector(
    (state) => state.announcement_Slice
  );

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        "http://localhost:8000/api/v1/update-announcement",
        { announcement },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Announced successfully");
        setAnnouncement("");
      })
      .catch(() => toast.error("Announcement failed"));
  };

  if (showAnnouncementModal) {
    return (
      <div
        id="modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-6/12 p-6">
          <h2 className="text-lg font-bold mb-4 text-pink-600">
            New Announcement
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="announcement">
                Message
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                id="announcement"
                value={announcement}
                onChange={handleInputChange}
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
                    announcementSliceActions.changeAnnouncementStatus({
                      showAnnouncementModal: false,
                    })
                  );
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-pink-600 text-white rounded"
              >
                Announce
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

export default Announcement;
