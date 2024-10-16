import { useSelector, useDispatch } from "react-redux";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { appointmentsDataSliceActions } from "../store/slices/AppintmentsDataSlice";
import { paginationSliceActions } from "../store/slices/PaginationDataSlice";
import { specializationSliceActions } from "../store/slices/SpecializationSlice";
import axios from "axios";

const Pagination = () => {
  const { dataToDisplay, currentPageNo, totalPages } = useSelector(
    (state) => state.pagination_Slice
  );

  const { specialization } = useSelector((state) => state.specialization_Slice);

  const { userId, email } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();

  const onPageChange = async (currentPageNo) => {
    // ADMIN...
    if (dataToDisplay == "all users") {
      await axios
        .get(`http://localhost:8000/api/v1/get-all-users/${currentPageNo}`, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "all verified users") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-all-verified-users/${userId}/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all verified users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "all unverified users") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-all-unverified-users/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all unverified users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "today's all users") {
      await axios
        .get(`http://localhost:8000/api/v1/get-today-users/${currentPageNo}`, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "today's all users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "today's all verified users") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-today-verified-users/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "today's all verified users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "today's all unverified users") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-today-unverified-users/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "today's all unverified users",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            usersDataSliceActions.getUsersData({
              allUsers: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    // USERS...
    if (dataToDisplay == "all appointments for a specific user") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-all-appointments-by-userId/${userId}/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all appointments for a specific user",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            appointmentsDataSliceActions.getAppointmentsData({
              allAppointments: res.data.appointments,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "today's all appointments for a specific user") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-today-appointments-by-userId/${userId}/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "today's all appointments for a specific user",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            appointmentsDataSliceActions.getAppointmentsData({
              allAppointments: res.data.appointments,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    // CLIENTS...
    if (dataToDisplay == "all appointments for a specific client") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-all-appointments-for-client/${email}/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all appointments for a specific client",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            appointmentsDataSliceActions.getAppointmentsData({
              allAppointments: res.data.appointments,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (dataToDisplay == "all users with a specific specialization") {
      await axios
        .get(
          `http://localhost:8000/api/v1/get-all-users-by-specific-specialization/${specialization}/${currentPageNo}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(
            paginationSliceActions.setPaginationDetails({
              dataToDisplay: "all users with a specific specialization",
              currentPageNo,
              totalPages: res.data.totalPages,
            })
          );
          dispatch(
            specializationSliceActions.changeSpecialization({
              specialization,
              usersBySpecialization: res.data.users,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePrevious = async () => {
    if (currentPageNo > 1) {
      dispatch(
        paginationSliceActions.setPaginationDetails({
          currentPageNo: currentPageNo - 1,
        })
      );
      onPageChange(currentPageNo - 1);
      renderPageNumbers();
    }
  };

  const handleNext = async () => {
    if (currentPageNo < totalPages) {
      dispatch(
        paginationSliceActions.setPaginationDetails({
          currentPageNo: currentPageNo + 1,
        })
      );
      onPageChange(currentPageNo + 1);
      renderPageNumbers();
    }
  };

  const handlePageClick = async (currentPageNo) => {
    dispatch(
      paginationSliceActions.setPaginationDetails({
        currentPageNo,
      })
    );
    onPageChange(currentPageNo);
    renderPageNumbers();
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => {
            dispatch(
              paginationSliceActions.setPaginationDetails({
                currentPageNo: i,
              })
            );
            handlePageClick(i);
          }}
          className={`mx-1 px-3 py-1 rounded ${
            currentPageNo === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={handlePrevious}
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        disabled={currentPageNo === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        disabled={currentPageNo === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
