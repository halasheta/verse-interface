// import logo from './logo.svg';
import "./App.css";
import Layout from "./pages/nav";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Chapters from "./pages/chapters";
import Verses from "./pages/verses";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChaptersAPIContext, {
    useChaptersAPIContext,
} from "./contexts/ChaptersAPIContext";
import VersesAPIContext, {
    useVersesAPIContext,
} from "./contexts/VersesAPIContext";
import SingleVerse from "./pages/singleVerse";
import UserAPIContext, { useUserAPIContext } from "./contexts/UserAPIContext";
import UserProfile from "./pages/profile";
import WelcomePage from "./pages/home";
import LoadingContext, { useLoadingContext } from "./contexts/LoadingContext";
import NavBar from "./components/NavBar";

function App() {
    return (
        <UserAPIContext.Provider value={useUserAPIContext()}>
            <ChaptersAPIContext.Provider value={useChaptersAPIContext()}>
                <VersesAPIContext.Provider value={useVersesAPIContext()}>
                    <LoadingContext.Provider value={useLoadingContext()}>
                        <div className="App">
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        path="/signup/"
                                        element={<SignUp />}
                                    />
                                    <Route path="/login/" element={<Login />} />
                                    <Route path="/" element={<NavBar />}>
                                        <Route
                                            path=""
                                            element={<WelcomePage />}
                                        />
                                        <Route
                                            path="quran/"
                                            element={<Chapters />}
                                        />
                                        <Route
                                            path="quran/:num/"
                                            element={<Verses />}
                                        />
                                        <Route
                                            path="quran/verse/:num/"
                                            element={<SingleVerse />}
                                        />
                                        <Route
                                            path="profile/"
                                            element={<UserProfile />}
                                        />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </LoadingContext.Provider>
                </VersesAPIContext.Provider>
            </ChaptersAPIContext.Provider>
        </UserAPIContext.Provider>
    );
}

export default App;
