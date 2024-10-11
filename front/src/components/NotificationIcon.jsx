import { IoNotifications } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const notificationCount = 10;

const NotificationIcon = () => {
  return (
    <NavLink className="relative rounded-md px-3 py-2 text-sm font-medium text-gray-300 flex items-center">
      <IoNotifications className="text-xl" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
          {notificationCount}
        </span>
      )}
    </NavLink>
  );
};

export default NotificationIcon;
