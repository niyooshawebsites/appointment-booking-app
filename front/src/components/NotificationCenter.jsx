import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const notifications = [
  {
    title: "Appointment Reminder",
    message: "You have an appointment on Oct 15 at 3 PM.",
    type: "info",
  },
  {
    title: "Cancellation Notice",
    message: "Your appointment on Oct 10 has been cancelled.",
    type: "alert",
  },
];

const NotificationCenter = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} aria-label="Close">
            <AiOutlineClose className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <div className="p-4 max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-600 text-center">No notifications</p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start p-2 border-b last:border-b-0"
              >
                <div className="mr-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      notification.type === "info"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-gray-600 text-xs">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 text-right">
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
