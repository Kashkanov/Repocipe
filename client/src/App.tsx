import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.js";
import NavBar from "./Components/Shared/Navbar.js";
import Recipes from "./pages/Recipes/Recipes.js";
import RecipePage from "./pages/RecipePage/RecipePage.js";
import AddRecipe from "./pages/Home/AddRecipe.js";
import MatchPage from "./pages/Matchipe/MatchPage.js";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import {AuthProvider} from "./Contexts/AuthContext.js";
import AuthWrapper from "./Wrappers/AuthWrapper.js";
import ReverseAuthWrapper from "./Wrappers/ReverseAuthWrapper.js";

function App() {

    return (
        // <AuthProvider>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    {/*<Route path="/" element={<AuthWrapper><Homepage/></AuthWrapper>}/>*/}
                    {/*<Route path="/Recipes" element={<AuthWrapper><Recipes/></AuthWrapper>}/>*/}
                    {/*<Route path="/Recipes/:id" element={<AuthWrapper><RecipePage/></AuthWrapper>}/>*/}
                    {/*<Route path="/Create" element={<AuthWrapper><AddRecipe/></AuthWrapper>}/>*/}
                    {/*<Route path="/Matchipe" element={<AuthWrapper><MatchPage/></AuthWrapper>}/>*/}

                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/Recipes" element={<Recipes/>}/>
                    <Route path="/Recipes/:id" element={<RecipePage/>}/>
                    <Route path="/Create" element={<AddRecipe/>}/>
                    <Route path="/Matchipe" element={<MatchPage/>}/>

                    {/*<Route path="/login" element={<ReverseAuthWrapper><Login/></ReverseAuthWrapper>}/>*/}
                    {/*<Route path="/register" element={<Register/>}/>*/}
                </Routes>
            </BrowserRouter>
        // </AuthProvider>
    )
}

export default App
