import * as Router from "react-router-dom";

import { queryParamsStore } from "./QueryParamsStore";

export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation();

  queryParamsStore.setSearch(search);
};
