// import logo from './logo.svg';
import './App.css';
import Layout from "./pages/nav";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Chapters from "./pages/chapters";
import Verses from "./pages/verses";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChaptersAPIContext, { useChaptersAPIContext } from './contexts/ChaptersAPIContext';
import VersesAPIContext, { useVersesAPIContext } from './contexts/VersesAPIContext';
import SingleVerse from './pages/singleVerse';
import UserAPIContext, { useUserAPIContext } from './contexts/UserAPIContext';




function App() {

  const chapters = (
    <ChaptersAPIContext.Provider value={ useChaptersAPIContext() }>
      <Chapters/>
    </ChaptersAPIContext.Provider>
  )

  const verses = (
      <VersesAPIContext.Provider value={ useVersesAPIContext() }>
        <Verses/>
      </VersesAPIContext.Provider>
  )
  
  return (
    <UserAPIContext.Provider value={ useUserAPIContext() }>
      <ChaptersAPIContext.Provider value={ useChaptersAPIContext()}>
        <VersesAPIContext.Provider value={ useVersesAPIContext() }>
          <div className="App">
            <BrowserRouter>
                    <Routes>
                      <Route path="/signup/" element={<SignUp/>}/>
                        <Route path="/login/" element={<Login/>}/>
                        <Route path="/" element={<Layout/>}>
                          

                          <Route path="quran/" element={ <Chapters/> }/>
                          <Route path="quran/:id/" element={ <Verses/> }/>
                          <Route path="quran/verse/:num/" element={<SingleVerse/>}/>
                        </Route>
                        
                        

                    </Routes>
              </BrowserRouter>
          </div>
        </VersesAPIContext.Provider>
      </ChaptersAPIContext.Provider>
    </UserAPIContext.Provider>
  );
}

export default App;
