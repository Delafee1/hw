import RecipePage from "@pages/RecipePage/RecipePage";
import RecipesPage from "@pages/RecipesPage/RecipesPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes" element={<RecipesPage />}>
          <Route path=":page" element={<RecipesPage />} />
        </Route>
        <Route path="/recipe">
          <Route path=":id" element={<RecipePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/recipes/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
