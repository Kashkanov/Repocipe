import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Home/Homepage.js";
import NavBar from "./components/Shared/Navbar.js";
import Recipes from "./pages/Recipes/Recipes.js";
import RecipePage from "./pages/RecipePage/RecipePage.js";
import AddRecipe from "./pages/Home/AddRecipe.js";
import MatchPage from "./pages/Matchipe/MatchPage.js";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import {AuthProvider} from "./contexts/AuthContext.js";
import AuthWrapper from "./wrappers/AuthWrapper.js";
import Admin from "./pages/Admin";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/Recipes" element={<Recipes/>}/>
                    <Route path="/Recipes/:id" element={<RecipePage/>}/>
                    <Route path="/Create" element={
                        <AuthWrapper access={["USER", "ADMIN"]}>
                            <AddRecipe/>
                        </AuthWrapper>
                    }/>
                    <Route path="/Admin" element={
                        <AuthWrapper access={["ADMIN"]}>
                            <Admin/>
                        </AuthWrapper>
                    }/>
                    <Route path="/Matchipe" element={<MatchPage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
