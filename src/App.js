import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./Components/RecipeList";
import RecipeDetail from "./Components/RecipeDetails";
import Recipe from "./Components/Recipe";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Recipe />} /> */}
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;