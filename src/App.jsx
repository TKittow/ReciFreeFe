import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Mainmenu from "./components/Mainmenu";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import RecipeIndex from "./components/RecipeIndex";
import AddRecipe from "./components/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";
import MealDetail from './components/MealDetail'
import MyPage from "./components/MyPage";


function App() {

  return (
    <BrowserRouter>
      <Mainmenu />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={ <HomePage /> }/>
          <Route path="/recipes" element={<RecipeIndex/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes/add" element={< AddRecipe />} />
          <Route path="/recipes/:id" element={< RecipeDetail />} />
          <Route path="/meals/:id" element={< MealDetail />} />
          <Route path="/mypage/:username" element={< MyPage />} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}
export default App;