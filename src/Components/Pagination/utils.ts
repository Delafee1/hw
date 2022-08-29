export const range = (from: number, to: number): number[] => {
  const range: number[] = [];

  while (from < to) {
    range.push(from);
    from++;
  }

  return range;
};

export const pages = (totalResults: number, currentPage: number) => {
  const totalPages = Math.ceil(totalResults / 10);

  let leftPages: number[] = [];
  let rightPages: number[] = [];
  const maximumSidePages = 2; //maximum number of pages from left/right of current page
  const numberOfPages = 5; //number of pages include current page

  switch (true) {
    case currentPage <= totalPages - maximumSidePages &&
      currentPage > maximumSidePages: {
      leftPages = range(currentPage - maximumSidePages, currentPage);
      rightPages = range(currentPage + 1, currentPage + (maximumSidePages + 1));
      break;
    }
    case currentPage > totalPages - maximumSidePages: {
      leftPages = range(
        currentPage - (numberOfPages - 1 - (totalPages - currentPage)),
        currentPage
      );
      rightPages = range(
        totalPages - (totalPages - (currentPage + 1)),
        totalPages + 1
      );
      break;
    }
    case currentPage <= maximumSidePages: {
      leftPages = range(1, numberOfPages - (numberOfPages - currentPage));
      rightPages = range(currentPage + 1, numberOfPages + 1);
      break;
    }
  }

  return { leftPages, rightPages, totalPages };
};
