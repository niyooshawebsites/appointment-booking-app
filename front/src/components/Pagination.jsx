const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
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
            currentPage === i
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
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
