import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  totalItemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const countPages = Math.ceil(totalItemsCount / pageSize);
  if (countPages === 1) return null;
  const pages = _.range(1, countPages + 1);
  return (
    <nav>
      <ul className='pagination pagination-lg mt-3'>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className='page-link'>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
