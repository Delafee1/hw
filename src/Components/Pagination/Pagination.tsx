import React from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./Pagination.module.scss";
import { pages } from "./utils";

type PaginationProps = {
  totalResults: number;
  currentPage: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  currentPage,
  className,
}: PaginationProps) => {
  const { leftPages, rightPages, totalPages } = pages(
    totalResults,
    currentPage
  );

  return (
    <div className={cn(styles.pagination, className)}>
      {currentPage !== 1 && (
        <Link to={`/recipes/${currentPage - 1}`}>
          <div className={styles.pagination__arrow}>&#10094;</div>
        </Link>
      )}
      {leftPages.length > 0 &&
        leftPages.map((page) => (
          <Link to={`/recipes/${page}`} key={page}>
            <div className={styles.pagination__page}>{page}</div>
          </Link>
        ))}
      <div className={styles.pagination__currentpage}>{currentPage}</div>
      {rightPages.length > 0 &&
        rightPages.map((page) => (
          <Link to={`/recipes/${page}`} key={page}>
            <div className={styles.pagination__page}>{page}</div>
          </Link>
        ))}
      {currentPage < totalPages - 2 && (
        <div className={styles.pagination__rest}>
          <div className={styles.pagination__page}>...</div>
          <Link to={`/recipes/${totalPages}`}>
            <div className={styles.pagination__page}>{totalPages}</div>
          </Link>
        </div>
      )}
      {currentPage !== totalPages && (
        <Link to={`/recipes/${currentPage + 1}`}>
          <div className={styles.pagination__arrow}>&#10095;</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
