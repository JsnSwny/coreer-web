import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  pageCount: number;
  onPageChange: ({ selected }: { selected: number }) => void;
  initialPage: number;
}

const Pagination = ({
  pageCount,
  onPageChange,
  initialPage,
}: PaginationProps) => {
  console.log(initialPage);
  return (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={initialPage - 1}
      breakLabel={"..."}
      breakClassName={styles.break}
      marginPagesDisplayed={2}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activeLink}
      previousClassName={styles.previous}
      nextClassName={styles.next}
      previousLinkClassName={styles.previousLink}
      nextLinkClassName={styles.nextLink}
      activeClassName={styles.selected}
    />
  );
};

export default Pagination;
