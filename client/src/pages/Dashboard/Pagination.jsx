import React from "react";
import style from "./Pagination.module.css";
import PropTypes from "prop-types";

function Pagination({ page, pageCount, setPage }) {
  function handlePrevious() {
    if (page === 1) return page;
    setPage((page) => page - 1);
  }

  function handleNext() {
    if (page === pageCount) return page;
    setPage((page) => page + 1);
  }
  return (
    <div className={style.pagination}>
      <button disabled={page === 1 || pageCount === 1} onClick={handlePrevious}>
        Previous
      </button>

      <select
        value={page}
        onChange={(e) => {
          setPage(Number(e.target.value));
        }}
      >
        {Array(pageCount)
          .fill(null)
          .map((_, index) => {
            return <option key={index}>{index + 1}</option>;
          })}
      </select>
      <button
        disabled={page === pageCount || pageCount === 1}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
