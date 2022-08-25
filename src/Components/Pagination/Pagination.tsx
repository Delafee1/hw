import styles from "@components/Pagination/Pagination.module.scss";
import classnames from "classnames";
import { Link } from "react-router-dom";

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
  const totalPages = Math.ceil(totalResults / 10);

  let leftPages: number[] = [];
  let rightPages: number[] = [];

  const range = (from: number, to: number): number[] => {
    let i = from;
    const range: number[] = [];

    while (i < to) {
      range.push(i);
      i++;
    }

    return range;
  };

  switch (true) {
    case currentPage <= totalPages - 2 && currentPage > 2: {
      leftPages = range(currentPage - 2, currentPage);
      rightPages = range(currentPage + 1, currentPage + 3);
      break;
    }
    case currentPage > totalPages - 2: {
      leftPages = range(
        currentPage - (4 - (totalPages - currentPage)),
        currentPage
      );
      rightPages = range(
        totalPages - (totalPages - (currentPage + 1)),
        totalPages + 1
      );
      break;
    }
    case currentPage <= 2: {
      leftPages = range(1, 5 - (5 - currentPage));
      rightPages = range(currentPage + 1, 6);
      break;
    }
  }

  return (
    <div className={classnames(styles.pagination, className)}>
      {currentPage !== 1 && (
        <Link to={`/recipes/${currentPage - 1}`}>
          <div className={styles.arrow}>&#10094;</div>
        </Link>
      )}
      {leftPages.length > 0 &&
        leftPages.map((page) => (
          <Link to={`/recipes/${page}`} key={page}>
            <div className={styles.page}>{page}</div>
          </Link>
        ))}
      <div className={styles.current_page}>{currentPage}</div>
      {rightPages.length > 0 &&
        rightPages.map((page) => (
          <Link to={`/recipes/${page}`} key={page}>
            <div className={styles.page}>{page}</div>
          </Link>
        ))}
      {currentPage < totalPages - 2 && (
        <div className={styles.rest}>
          <div className={styles.page}>...</div>
          <Link to={`/recipes/${totalPages}`}>
            <div className={styles.page}>{totalPages}</div>
          </Link>
        </div>
      )}
      {currentPage !== totalPages && (
        <Link to={`/recipes/${currentPage + 1}`}>
          <div className={styles.arrow}>&#10095;</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
