import { queryParamsStore } from "@store/QueryParamsStore";

import { paginationStore } from "./PaginationStore";

export const getInitPage = () => {
  const page = queryParamsStore.getParam("page");
  paginationStore.setCurrentPage(page);
};
