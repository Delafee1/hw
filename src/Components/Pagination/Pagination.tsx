import React from "react";

import { categoriesStore } from "@store/CategoriesStore";
import { paginationStore } from "@store/PaginationStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import styles from "./Pagination.module.scss";
import { pages } from "./utils";

type PaginationProps = {
  totalResults: number;
  className?: string;
};

///recipes/?categories=${categoriesStore.getSelectedCategoriesString()}&page=${paginationStore.currentPage - 1}

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  className,
}: PaginationProps) => {
  const { leftPages, rightPages, totalPages } = pages(
    totalResults,
    paginationStore.currentPage
  );

  return (
    <div className={cn(styles.pagination, className)}>
      {paginationStore.currentPage !== 1 && (
        <Link to={`/123/`}>
          <div className={styles.pagination__arrow}>&#10094;</div>
        </Link>
      )}
      {leftPages.length > 0 &&
        leftPages.map((page) => (
          <Link
            to={`/recipes/?categories=${categoriesStore.getSelectedCategoriesString()}&page=${page}`}
            key={page}
          >
            <div className={styles.pagination__page}>{page}</div>
          </Link>
        ))}
      <div className={styles.pagination__currentpage}>
        {paginationStore.currentPage}
      </div>
      {rightPages.length > 0 &&
        rightPages.map((page) => (
          <Link
            to={`/recipes/?categories=${categoriesStore.getSelectedCategoriesString()}&page=${page}`}
            key={page}
          >
            <div className={styles.pagination__page}>{page}</div>
          </Link>
        ))}
      {paginationStore.currentPage < totalPages - 2 && (
        <div className={styles.pagination__rest}>
          <div className={styles.pagination__page}>...</div>
          <Link
            to={`/recipes/?categories=${categoriesStore.getSelectedCategoriesString()}&page=${totalPages}`}
          >
            <div className={styles.pagination__page}>{totalPages}</div>
          </Link>
        </div>
      )}
      {paginationStore.currentPage !== totalPages && (
        <Link
          to={`/recipes/?categories=${categoriesStore.getSelectedCategoriesString()}&page=${
            paginationStore.currentPage + 1
          }`}
        >
          <div className={styles.pagination__arrow}>&#10095;</div>
        </Link>
      )}
    </div>
  );
};

export default observer(Pagination);
