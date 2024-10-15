import { useSelector, useDispatch } from "react-redux";
import { usersDataSliceActions } from "../store/slices/UsersDataSlice";
import { paginationSliceActions } from "../store/slices/PaginationDataSlice";
import axios from "axios";

const Pagination = () => {
  const { dataToDisplay, currentPageNo, totalPages } = useSelector(
    (state) => state.pagination_Slice
  );

  const { userId } = useSelector((state) => state.user_Slice);
  const dispatch = useDispatch();

  const onPageChange = async (currentPageNo) => {
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
