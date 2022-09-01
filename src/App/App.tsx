import { useEffect } from "react";

import RecipePage from "@pages/RecipePage";
import RecipesPage from "@pages/RecipesPage";
import { getInitCategories } from "@store/CategoriesStore/getInitCategories";
import { getInitPage } from "@store/PaginationStore/getInitPage";
import { useQueryParamsStoreInit } from "@store/QueryParamsStore/useQueryParamsStoreInit";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  useQueryParamsStoreInit();
  useEffect(() => {
    getInitCategories();
    getInitPage();
  }, []);

  return (
    <Routes>
      <Route index element={<RecipesPage />} />
      <Route path="/recipes/" element={<RecipesPage />} />
      <Route path="/recipe/*" element={<RecipePage />} />
    </Routes>
  );
};

export default App;
