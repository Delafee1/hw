import RecipePage from "@pages/RecipePage";
import RecipesPage from "@pages/RecipesPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes/:page" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="*" element={<Navigate to="/recipes/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
