import { useSelector } from "react-redux";

const Pagination = () => {
  const { currentPageNo, totalPages } = useSelector(
    (state) => state.pagination_Slice
  );

  const handlePrevious = () => {
    if (currentPageNo > 1) {
      onPageChange(currentPageNo - 1);
    }
  };

  const handleNext = () => {
    if (currentPageNo < totalPages) {
      onPageChange(currentPageNo + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
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
