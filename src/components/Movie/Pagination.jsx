import PropTypes from 'prop-types'; 


const Pagination = ({ totalPages, currentPage, onPageChange, pagiClass }) => {


  const handlePageChange = (page) => {
    onPageChange(page);
  };


  // Pagination buttons - showing 3 pages at a time
  const pages = [];
  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  // Ensuring startPage and endPage are within valid limits
  if (startPage < 1) startPage = 1;
  if (endPage > totalPages) endPage = totalPages;

  // Adding page numbers to pages array
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`mt-10 flex items-center gap-6 ${pagiClass}`}>
      <h4 className="text-xl text-white">
        <span className="font-semibold text-primary">Page</span> {currentPage} of {totalPages}
      </h4>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="text-base font-medium text-white border-2 border-primary bg-primary rounded-lg py-2 px-4 disabled:opacity-50"
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-primary text-white border-2 border-primary"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 1}
          className="text-base font-medium text-white border-2 rounded-lg bg-primary border-primary px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};



Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    pagiClass: PropTypes.string
}

export default Pagination;
